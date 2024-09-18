import express from 'express';
import { createPost, createReels, getAllPosts, likeOrDislike, saveOrUnsaved, trandingPosts } from '../controllers/post.controller.js';
import { verifyJWT } from '../middlerwares/verifyJWT.js';
import { imageUpload } from '../middlerwares/imageUpload.js';
import uploadVideo from '../middlerwares/videoUpload.js';

const router = express.Router();

router.post('/create-post', verifyJWT, imageUpload.single("postImage"), createPost);
router.post('/create-reels', verifyJWT, uploadVideo.single("reelVideo"), createReels);

router.get("/get-posts", verifyJWT, getAllPosts);

router.post('/like-dislike/:postId', verifyJWT, likeOrDislike);

router.post('/saved-unsaved/:postId', verifyJWT, saveOrUnsaved);

router.get('/tranding-posts', verifyJWT, trandingPosts);



export default router;