import { Router } from "express";
import {
  getPrestamos,
  getPrestamoById,
  createPrestamo,
  updatePrestamo,
  deletePrestamo,
  countAllPrestamos,
  countPrestamosByEstado,
} from "../controllers/prestamos.controllers.js";
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.get("/prestamos", authenticateToken, authorizeRoles("administrador", "empleado", "socio"), getPrestamos);
router.get("/prestamos/:id", authenticateToken, authorizeRoles("administrador", "empleado", "socio"), getPrestamoById);
router.post("/prestamos", authenticateToken, authorizeRoles("administrador", "empleado", "socio"), createPrestamo);
router.put("/prestamos/:id", authenticateToken, authorizeRoles("administrador", "empleado"), updatePrestamo);
router.delete("/prestamos/:id", authenticateToken, authorizeRoles("administrador", "empleado"), deletePrestamo);
router.get('/prestamos/countByEstado', authenticateToken, authorizeRoles("administrador", "empleado"), countPrestamosByEstado);
router.get('/prestamos/countAll' , authenticateToken, authorizeRoles("administrador", "empleado"), countAllPrestamos);

export default router;
