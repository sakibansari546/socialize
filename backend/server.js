import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

// Local files import
import connectDB from './config/db.js';

// Routes import
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';

dotenv.config();

const server = express();
const PORT = process.env.PORT || 3000;



const corsOptions = {
    origin: ['http://localhost:3000', process.env.CLIENT_URL],
    credentials: true,
    optionSuccessStatus: 200
}
server.use(cors(corsOptions));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser())


// User Routes
server.use('/api/user', userRoutes);
server.use('/api/post', postRoutes)

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});