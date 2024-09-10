import bcrypt from 'bcrypt';

import User from '../models/user.model.js';
import { genrateTokenAndSetCookie } from '../utils/genrateTokenAndSetCookie.js';
import { sendVerificationEmail, sendWelcomeEmail } from '../nodemailer/emails.js';

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

                return res.status(401).json({ success: false, message: "Email not verified, new verification code sent to your email" });
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

        genrateTokenAndSetCookie(res, user._id);
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
        res.cookie("token", "", { maxAge: 1 });
        res.status(200).json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};
