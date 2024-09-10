import jwt from 'jsonwebtoken';

export const genrateTokenAndSetCookie = async (res, userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.SECRET_ACCESS_KEY, { expiresIn: "1d" });
        res.cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'None',
            secure: process.env.NODE_ENV === 'production',
        });
        console.log("Cookie set with attributes:", {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'None',
            secure: process.env.NODE_ENV === 'production',
        });
        return token;
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "token error" })
    }
}
