import { Router } from "express";
import {
  getHistorial,
  getHistorialById,
  createHistorial,
  updateHistorial,
  deleteHistorial
} from "../controllers/historialestadosprestamos.controllers.js";
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.get("/historial", authenticateToken, authorizeRoles("administrador", "empleado"), getHistorial);
router.get("/historial/:id", authenticateToken, authorizeRoles("administrador", "empleado"), getHistorialById);
router.post("/historial", authenticateToken, authorizeRoles("administrador", "empleado"), createHistorial);
router.put("/historial/:id", authenticateToken, authorizeRoles("administrador", "empleado"), updateHistorial);
router.delete("/historial/:id", authenticateToken, authorizeRoles("administrador"), deleteHistorial);

export default router;
