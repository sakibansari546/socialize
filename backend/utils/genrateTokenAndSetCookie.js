import jwt from "jsonwebtoken";

export const genrateTokenAndSetCookie = async (res, userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.SECRET_ACCESS_KEY, { expiresIn: "1d" })
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        })
        return token;
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "token error" })
    }
}