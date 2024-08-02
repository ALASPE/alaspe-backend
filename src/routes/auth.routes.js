import { Router } from "express";
import {
  loginSocio,
  logoutSocio,
  verifySession,
} from "../controllers/auth.controllers.js";
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.post("/login", loginSocio);
router.post("/logout", logoutSocio);
router.get("/verify-session", authenticateToken, authorizeRoles("administrador"), verifySession);

export default router;
