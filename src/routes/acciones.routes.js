import { Router } from "express";
import {
  getAcciones,
  getAccion,
  createAccion,
} from "../controllers/acciones.controllers.js";
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.get("/acciones", authenticateToken, authorizeRoles("administrador"), getAcciones);
router.get("/acciones/:id", authenticateToken, authorizeRoles("administrador"), getAccion);
router.post("/acciones", authenticateToken, authorizeRoles("administrador", "empleado"), createAccion);

export default router;
