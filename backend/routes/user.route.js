import { Router } from 'express';

import { checkAuth, editProfile, followerFollowingList, followOrUnfollow, forgotPassword, getSuggestedUsers, getUserProfile, logout, resetPassword, signin, signup, verifyEmail } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlerwares/verifyJWT.js';
import { imageUpload } from '../middlerwares/imageUpload.js';

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

router.post('/edit-profile', verifyJWT, imageUpload.single('profileImage'), editProfile);

router.post('/follow-unfollow/:userId', verifyJWT, followOrUnfollow);

router.post('/followers-following-list/:userId', followerFollowingList)


export default router