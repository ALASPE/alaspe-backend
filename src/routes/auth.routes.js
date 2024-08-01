import { Router } from "express";
import {
  loginSocio,
  logoutSocio,
  verifySession,
} from "../controllers/auth.controllers.js";

const router = Router();

router.post("/login", loginSocio);
router.post("/logout", logoutSocio);
router.get("/verify-session", verifySession);

export default router;
