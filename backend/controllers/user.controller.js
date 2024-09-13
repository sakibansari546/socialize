import bcrypt from 'bcrypt';
import crypto from 'crypto';

import User from '../models/user.model.js';
import { genrateTokenAndSetCookie } from '../utils/genrateTokenAndSetCookie.js';
import { sendPasswordResetEmail, sendVerificationEmail, sendWelcomeEmail } from '../nodemailer/emails.js';
import { getDataURI } from '../utils/dataURI.js';
import cloudinary from '../utils/cloudinary.js'

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if all required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Validate username length
        if (username.length < 3) {
            return res.status(400).json({ success: false, message: "Username must be at least 3 characters long" });
        }

        // Validate email format
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        // Validate password format
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ success: false, message: "Password must be between 6 and 20 characters long and contain at least one uppercase letter, one lowercase letter, and one number" });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // Check if the existing user's verification token is expired
            if (existingUser?.verificationTokenExpiresAt && existingUser?.verificationTokenExpiresAt < Date.now()) {
                // Generate a new verification token
                const verificationToken = Math.floor(1000 + Math.random() * 9000).toString();

                existingUser.verificationTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour 
                existingUser.verificationToken = verificationToken;
                await existingUser.save();

                genrateTokenAndSetCookie(res, existingUser._id);
                sendVerificationEmail(existingUser.email, verificationToken);

                return res.status(401).json({ success: true, message: "Email not verified, new verification code sent to your email" });
            }

            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        // Hash the password
        const hash_password = await bcrypt.hash(password, 10);

        // Generate 4-digit OTP
        const verificationToken = Math.floor(1000 + Math.random() * 9000).toString();

        // Create a new user
        const user = new User({
            username,
            email,
            password: hash_password,
            verificationToken,
            // verificationTokenExpiresAt: Date.now() + 1 * 60 * 60 * 1000, // 1 hour
            verificationTokenExpiresAt: Date.now() + 60 * 1000, // 1 min
        });

        // Save the user
        await user.save();

        genrateTokenAndSetCookie(res, user._id);
        sendVerificationEmail(email, verificationToken);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: user // Exclude versionKey field
        });

    } catch (error) {
        // Handle duplicate key error for email
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

export const verifyEmail = async (req, res) => {
    const { token } = req.body;
    console.log(token);


    try {
        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpiresAt: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired token" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();

        sendWelcomeEmail(user.email, user.username)

        res.status(200).json({ success: true, message: "Email verified successfully", user: user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if all required fields are provided
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check if email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Email does not exist" });
        }
        if (!user.isVerified) return res.json({ success: false, message: "Please verify your email" });

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid Password" });
        }

        genrateTokenAndSetCookie(res, user._id);
        sendWelcomeEmail(email, user.username);

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: user // Exclude versionKey field
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        });
        return res.status(200).json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password -__v");
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email format
        if (!emailRegex.test(email)) { // Fixed typo: .tast -> .test
            return res.status(400).json({ message: "Invalid email", success: false });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        // Check if reset password token is already generated and not expired
        if (user.resetPasswordExpiresAt && user.resetPasswordExpiresAt > Date.now()) {
            return res.status(400).json({ message: "Password reset link already sent to your email", success: false });
        }

        // Check if email is verified
        if (!user.isVerified) {
            return res.status(400).json({ message: "Email not verified", success: false });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
        await user.save();

        const passwordResetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        sendPasswordResetEmail(user.email, passwordResetLink);

        res.status(200).json({ success: true, message: "Password reset link sent to your email" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const { token } = req.params;

        // Validate password format
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ success: false, message: "Password must be between 6 and 20 characters long and contain at least one uppercase letter, one lowercase letter, and one number" });
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired token" });
        }

        if (!user.isVerified) return res.status(400).json({ success: false, message: "Email not verified" })

        const hash_password = await bcrypt.hash(password, 10);
        user.password = hash_password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        res.status(200).json({ success: true, message: "Password reset successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select("-password -__v");
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

export const getSuggestedUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.userId } }).select("-password -__v").limit(5);
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

export const editProfile = async (req, res) => {
    const { fullname, bio, username } = req.body;
    const profileImage = req.file;

    try {
        if (!username) return res.status(400).json({ message: "Username is required", success: false });
        if (!fullname) return res.status(400).json({ message: "Fullname is required", success: false });
        if (!bio) return res.status(400).json({ message: "Bio is required", success: false });
        if (bio.length > 100) return res.status(400).json({ message: "Bio should be less than 100 characters", success: false })

        const user = await User.findById(req.userId).select('-password');
        if (!user) return res.status(400).json({ message: "User not found", success: false });

        const normalizedUsername = username.replace(/\s+/g, '').toLowerCase();

        // Check if the username is already taken by another user
        const isUsername = await User.findOne({ username: normalizedUsername });
        if (isUsername && isUsername._id.toString() !== user._id.toString()) {
            return res.status(400).json({ message: "Username already taken", success: false });
        }

        user.username = normalizedUsername;
        if (fullname) user.fullname = fullname;
        if (bio) user.bio = bio;

        // Handle profile image upload
        if (profileImage) {
            const fileURI = getDataURI(profileImage);
            const cloudRes = await cloudinary.uploader.upload(fileURI, { resource_type: "image" });
            user.profile_img = cloudRes.secure_url;
        }

        await user.save();
        res.status(200).json({ success: true, message: "Profile updated successfully", user });
    } catch (error) {
        console.error(error);

        if (error.code === 11000 || error.keyPattern?.username) {
            return res.status(400).json({ message: "Username already exists", success: false });
        }
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};
