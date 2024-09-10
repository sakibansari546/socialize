import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookie.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error("Error in verifyToken: ", error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Unauthorized - Token has expired" });
        }

        return res.status(500).json({ success: false, message: "Server error" });
    }
}