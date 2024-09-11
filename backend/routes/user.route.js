import { Router } from 'express';
import { checkAuth, logout, signin, signup, verifyEmail } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlerwares/verifyJWT.js';
const router = Router();

router.get("/check-auth", verifyJWT, checkAuth)

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/verify-email', verifyEmail);
router.post('/logout', logout);



export default router