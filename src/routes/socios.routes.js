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

router.get('/socio', authenticateToken, authorizeRoles("administrador", "empleado"), getSocios);
router.get('/socio/:dni', authenticateToken, authorizeRoles("administrador", "socio", "empleado"), getSocio);
router.post('/socio', authenticateToken, authorizeRoles(""), createSocio);
router.put('/socio/:dni', authenticateToken, authorizeRoles("administrador"), updateSocio);
router.delete('/socio/:dni', authenticateToken, authorizeRoles("administrador"), deleteSocio);

export default router;
