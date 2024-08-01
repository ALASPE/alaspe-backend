import { Router } from "express";
import {
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario
} from "../controllers/usuarios.controllers.js";
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.get("/usuarios", authenticateToken, authorizeRoles("administrador"), getUsuarios);
router.get("/usuarios/:id", authenticateToken, authorizeRoles("administrador"),  getUsuario);
router.post("/usuarios", authenticateToken, authorizeRoles("administrador"), createUsuario);
router.put("/usuarios/:id", authenticateToken, authorizeRoles("administrador"),updateUsuario);
router.delete("/usuarios/:id",authenticateToken, authorizeRoles("administrador"), deleteUsuario);

export default router;

