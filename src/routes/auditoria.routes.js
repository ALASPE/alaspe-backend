import { Router } from "express";
import {
    getAuditorias,
    getAuditoria,
    createAuditoria,
    updateAuditoria,
    deleteAuditoria
} from '../controllers/auditoria.controllers.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/auditorias', authenticateToken, authorizeRoles("admin", "empleado"), getAuditorias);
router.get('/auditorias/:id', authenticateToken, authorizeRoles("admin", "empleado"), getAuditoria);
router.post('/auditorias', authenticateToken, authorizeRoles("admin", "empleado"), createAuditoria);
router.put('/auditorias/:id', authenticateToken, authorizeRoles("admin", "empleado"), updateAuditoria);
router.delete('/auditorias/:id', authenticateToken, authorizeRoles("admin", "empleado"), deleteAuditoria);

export default router;
