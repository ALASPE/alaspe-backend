import { Router } from "express";
import {
  getPrestamos,
  getPrestamoById,
  createPrestamo,
  updatePrestamo,
  deletePrestamo
} from "../controllers/prestamos.controllers.js";
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.get("/prestamos", authenticateToken, authorizeRoles("administrador", "empleado", "socio"), getPrestamos);
router.get("/prestamos/:id", authenticateToken, authorizeRoles("administrador", "empleado", "socio"), getPrestamoById);
router.post("/prestamos", authenticateToken, authorizeRoles("administrador", "empleado", "socio"), createPrestamo);
router.put("/prestamos/:id", authenticateToken, authorizeRoles("administrador", "empleado"), updatePrestamo);
router.delete("/prestamos/:id", authenticateToken, authorizeRoles("administrador", "empleado"), deletePrestamo);

export default router;
