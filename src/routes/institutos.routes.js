import { Router } from "express";
import {
  getInstituciones,
  getInstitucionById,
  createInstitucion,
  updateInstitucion,
  deleteInstitucion
} from "../controllers/institutos.controllers.js";
const router = Router();

router.get("/instituciones", getInstituciones);
router.get("/instituciones/:id", getInstitucionById);
router.post("/instituciones", createInstitucion);
router.put("/instituciones/:id", updateInstitucion);
router.delete("/instituciones/:id", deleteInstitucion);

export default router;
