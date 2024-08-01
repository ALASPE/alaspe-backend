import { Router } from "express";
import {
    getSocios,
    getSocio,
    createSocio,
    updateSocio,
    deleteSocio,
} from '../controllers/socios.controllers.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/persona', authenticateToken, authorizeRoles("admin", "socio", "empleado"), getSocios);
router.get('/persona/:DNI', authenticateToken, authorizeRoles("admin", "socio", "empleado"), getSocio);
router.post('/persona', authenticateToken, authorizeRoles(""), createSocio);
router.put('/persona/:DNI', authenticateToken, authorizeRoles("admin"), updateSocio);
router.delete('/persona/:DNI', authenticateToken, authorizeRoles("admin"), deleteSocio);

export default router;
