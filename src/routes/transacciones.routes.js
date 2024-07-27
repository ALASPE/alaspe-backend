import { Router } from "express";
import {
    getTransacciones,
    getTransaccion,
    createTransaccion,
    updateTransaccion,
    deleteTransaccion
} from '../controllers/transacciones.controllers.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/transacciones', authenticateToken, authorizeRoles("admin", "empleado", "socio"), getTransacciones);
router.get('/transacciones/:id', authenticateToken, authorizeRoles("admin", "empleado", "socio"), getTransaccion);
router.post('/transacciones', authenticateToken, authorizeRoles("admin", "empleado"), createTransaccion);
router.put('/transacciones/:id', authenticateToken, authorizeRoles("admin", "empleado"), updateTransaccion);
router.delete('/transacciones/:id', authenticateToken, authorizeRoles("admin", "empleado"), deleteTransaccion);

export default router;
