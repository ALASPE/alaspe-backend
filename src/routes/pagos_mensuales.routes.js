import { Router } from "express";
import {
    getPagosMensuales,
    getPagoMensual,
    createPagoMensual,
    updatePagoMensual,
    deletePagoMensual
} from '../controllers/pagos_mensuales.controllers.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/pagos-mensuales', authenticateToken, authorizeRoles("admin", "empleado", "socio"), getPagosMensuales);
router.get('/pagos-mensuales/:id', authenticateToken, authorizeRoles("admin", "empleado", "socio"), getPagoMensual);
router.post('/pagos-mensuales', authenticateToken, authorizeRoles("admin", "empleado"), createPagoMensual);
router.put('/pagos-mensuales/:id', authenticateToken, authorizeRoles("admin", "empleado"), updatePagoMensual);
router.delete('/pagos-mensuales/:id', authenticateToken, authorizeRoles("admin", "empleado"), deletePagoMensual);

export default router;
