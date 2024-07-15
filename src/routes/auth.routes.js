import express from 'express';
import { 
    loginUser, 
    logoutUser,
    verifySession
} from '../controllers/auth.controller.js';

import {
    isAuthenticated, 
    isAdmin,
    isUser
} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/verifysession', verifySession);

// Rutas protegidas
router.get('/admin', isAuthenticated, isAdmin, (req, res) => {
    res.status(200).json({ message: 'Welcome to the admin dashboard' });
});

router.get('/user', isAuthenticated, isUser, (req, res) => {
    res.status(200).json({ message: 'Welcome to the user dashboard' });
});

export default router;