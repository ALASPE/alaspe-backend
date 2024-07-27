import { Router } from "express";
import {
    getTiposDescuentos,
    getTipoDescuento,
    createTipoDescuento,
    updateTipoDescuento,
    deleteTipoDescuento
} from '../controllers/tipos_descuentos.controllers.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/tipos-descuentos', authenticateToken, authorizeRoles("admin", "empleado", "socio"), getTiposDescuentos);
router.get('/tipos-descuentos/:id', authenticateToken, authorizeRoles("admin", "empleado", "socio"), getTipoDescuento);
router.post('/tipos-descuentos', authenticateToken, authorizeRoles("admin", "empleado"), createTipoDescuento);
router.put('/tipos-descuentos/:id', authenticateToken, authorizeRoles("admin", "empleado"), updateTipoDescuento);
router.delete('/tipos-descuentos/:id', authenticateToken, authorizeRoles("admin", "empleado"), deleteTipoDescuento);

export default router;
