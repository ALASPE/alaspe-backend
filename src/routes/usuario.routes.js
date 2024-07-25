import { Router } from "express";
import {
    getUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuario
} from '../controllers/usuario.controllers.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/usuario', authenticateToken, authorizeRoles("admin", "socio"), getUsuarios);
router.post('/usuario', authenticateToken, authorizeRoles("admin"), createUsuario);
router.put('/usuario/:DNI', authenticateToken, authorizeRoles("admin"), updateUsuario);
router.delete('/usuario/:DNI', authenticateToken, authorizeRoles("admin"), deleteUsuario);
router.get('/usuario/:DNI', authenticateToken, authorizeRoles("admin", "socio"), getUsuario);

export default router;