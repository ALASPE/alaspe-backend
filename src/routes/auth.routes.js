import { Router } from "express";
import {
  loginSocio,
  logoutSocio,
  loginUsuario,
  logoutUsuario,
  verifySessionSocio,
  verifySessionUsuario
} from "../controllers/auth.controllers.js";
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.post("/login", loginSocio);
router.post("/logout", logoutSocio);
router.post("/login/usuario", loginUsuario);
router.post("/logout/usuario", logoutUsuario);
router.get("/verify-session", authenticateToken, authorizeRoles("administrador"), verifySessionSocio);
router.get("/verify-session/usuario", authenticateToken, authorizeRoles("administrador"), verifySessionUsuario);

export default router;
