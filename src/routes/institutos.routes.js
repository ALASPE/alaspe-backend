import { Router } from "express";
import {
  getInstitutos,
  getInstituto,
  createInstituto,
  updateInstituto,
  deleteInstituto
} from "../controllers/institutos.controllers.js";
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.get("/institutos", authenticateToken, authorizeRoles("administrador"), getInstitutos);
router.get("/institutos/:id", authenticateToken, authorizeRoles("administrador"), getInstituto);
router.post("/institutos", authenticateToken, authorizeRoles("administrador"), createInstituto);
router.put("/institutos/:id", authenticateToken, authorizeRoles("administrador"), updateInstituto);
router.delete("/institutos/:id", authenticateToken, authorizeRoles("administrador"), deleteInstituto);

export default router;
