import { Router } from "express";
import {
  getAportes,
  getAporte,
  createAporte,
  updateAporte,
  deleteAporte
} from "../controllers/aportes.controllers.js";
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.get("/aportes", authenticateToken, authorizeRoles("administrador", "empleado", "socio"), getAportes);
router.get("/aportes/:id", authenticateToken, authorizeRoles("administrador", "empleado", "socio"), getAporte);
router.post("/aportes", authenticateToken, authorizeRoles("administrador", "empleado"), createAporte);
router.put("/aportes/:id", authenticateToken, authorizeRoles("administrador", "empleado"), updateAporte);
router.delete("/aportes/:id", authenticateToken, authorizeRoles("administrador", "empleado"), deleteAporte);

export default router;
