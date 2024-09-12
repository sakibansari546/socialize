import { Router } from 'express';

import { checkAuth, forgotPassword, getSuggestedUsers, getUserProfile, logout, resetPassword, signin, signup, verifyEmail } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlerwares/verifyJWT.js';

const router = Router();

router.get("/check-auth", verifyJWT, checkAuth)

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/verify-email', verifyEmail);

router.post('/logout', logout);


router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

router.post('/user-profile/:userId', verifyJWT, getUserProfile)
router.get('/suggested-users', verifyJWT, getSuggestedUsers)


export default router