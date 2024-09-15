import express from 'express';
import { createPost, createReels } from '../controllers/post.controller.js';
import { verifyJWT } from '../middlerwares/verifyJWT.js';
import { imageUpload } from '../middlerwares/imageUpload.js';
import uploadVideo from '../middlerwares/videoUpload.js';

const router = express.Router();

router.post('/create-post', verifyJWT, imageUpload.single("postImage"), createPost);
router.post('/create-reels', verifyJWT, uploadVideo.single("reelVideo"), createReels);

export default router;