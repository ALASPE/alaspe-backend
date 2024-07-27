import { Router } from "express";
import {
    getCuentas,
    getCuenta,
    createCuenta,
    updateCuenta,
    deleteCuenta
} from '../controllers/cuentas.controllers.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/cuentas', authenticateToken, authorizeRoles("admin", "empleado", "socio"), getCuentas);
router.get('/cuentas/:id', authenticateToken, authorizeRoles("admin", "empleado", "socio"), getCuenta);
router.post('/cuentas', authenticateToken, authorizeRoles("admin", "empleado"), createCuenta);
router.put('/cuentas/:id', authenticateToken, authorizeRoles("admin", "empleado"), updateCuenta);
router.delete('/cuentas/:id', authenticateToken, authorizeRoles("admin", "empleado"), deleteCuenta);

export default router;
