import { Router } from 'express';
import { loginUser, logoutUser, verifySession } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/verify-session', verifySession);

export default router;
