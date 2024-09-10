import { Router } from 'express';
import { logout, signin, signup, verifyEmail } from '../controllers/user.controller.js';
const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/verify-email', verifyEmail);
router.post('/logout', logout);



export default router