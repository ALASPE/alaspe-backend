import { Router } from "express";
import {
    getPrestamos,
    getPrestamo,
    createPrestamo,
    updatePrestamo,
    deletePrestamo
} from '../controllers/prestamos.controllers.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/prestamos', authenticateToken, authorizeRoles("admin", "empleado", "socio"), getPrestamos);
router.get('/prestamos/:id', authenticateToken, authorizeRoles("admin", "empleado", "socio"), getPrestamo);
router.post('/prestamos', authenticateToken, authorizeRoles("admin", "empleado"), createPrestamo);
router.put('/prestamos/:id', authenticateToken, authorizeRoles("admin", "empleado"), updatePrestamo);
router.delete('/prestamos/:id', authenticateToken, authorizeRoles("admin", "empleado"), deletePrestamo);

export default router;
