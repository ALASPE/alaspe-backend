import { Router } from "express";
import {
    loginUser,
    logoutUser
} from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/protected', isAuthenticated, (res, req) => {
    res.status(200).json({ message: 'Tienes acceso a esta ruta' })
})

export default router;