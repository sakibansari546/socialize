import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

// Local files import
import connectDB from './config/db.js';

// Routes import
import userRoutes from './routes/user.route.js';

dotenv.config();

const server = express();
const PORT = process.env.PORT || 3000;


// Middlewares
server.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true, // Allow credentials
}));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser())


// User Routes
server.use('/api/user', userRoutes);
server.post('/login', (req, res) => {
    // Example: Generate a JWT token
    const token = jwt.sign({ userId: 'exampleUserId' }, process.env.SECRET_ACCESS_KEY, { expiresIn: '1d' });

    res.cookie('token', token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: 'None', // Required for cross-site cookies
        secure: process.env.NODE_ENV === 'production', // Secure only in production
    });

    res.json({ success: true });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});