import { Router } from "express";
import {
  getAcciones,
  getAccion,
  createAccion,
} from "../controllers/acciones.controllers.js";
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.get("/acciones", authenticateToken, authorizeRoles("administrador", "empleado"), getAcciones);
router.get("/acciones/:id", authenticateToken, authorizeRoles("administrador", "empleado"), getAccion);
router.post("/acciones", authenticateToken, authorizeRoles("administrador", "empleado"), createAccion);

export default router;
