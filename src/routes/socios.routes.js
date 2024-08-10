import { Router } from "express";
import {
  getSocios,
  getSocio,
  createSocio,
  updateSocio,
  deleteSocio,
  countSocios,
} from '../controllers/socios.controllers.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/socio', authenticateToken, authorizeRoles("administrador", "empleado"), getSocios);
router.get('/socio/:dni', authenticateToken, authorizeRoles("administrador", "empleado", "socio"), getSocio);
router.post('/socio', authenticateToken, authorizeRoles("administrador"), createSocio);
router.put('/socio/:dni', authenticateToken, authorizeRoles("administrador"), updateSocio);
router.delete('/socio/:dni', authenticateToken, authorizeRoles("administrador"), deleteSocio);
router.get('/socios/count', authenticateToken, authorizeRoles("administrador", "empleado"), countSocios);

export default router;
