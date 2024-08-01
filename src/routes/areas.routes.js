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

router.get("/areas", getAreas);
router.get("/areas/:id", getArea);
router.post("/areas", createArea);
router.put("/areas/:id", updateArea);
router.delete("/areas/:id", deleteArea);

export default router;
