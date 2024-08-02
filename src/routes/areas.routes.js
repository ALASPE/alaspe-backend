import { Router } from "express";
import {
  getAreas,
  getArea,
  createArea,
  updateArea,
  deleteArea
} from "../controllers/areas.controllers.js";
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.get("/areas", authenticateToken, authorizeRoles("administrador"), getAreas);
router.get("/areas/:id", authenticateToken, authorizeRoles("administrador"), getArea);
router.post("/areas", authenticateToken, authorizeRoles("administrador"), createArea);
router.put("/areas/:id", authenticateToken, authorizeRoles("administrador"), updateArea);
router.delete("/areas/:id", authenticateToken, authorizeRoles("administrador"), deleteArea);

export default router;
