import { Router } from "express";
import {
  getHistorial,
  getHistorialById,
  createHistorial,
  updateHistorial,
  deleteHistorial
} from "../controllers/historialestadosprestamos.controllers.js";

const router = Router();

router.get("/historial", getHistorial);
router.get("/historial/:id", getHistorialById);
router.post("/historial", createHistorial);
router.put("/historial/:id", updateHistorial);
router.delete("/historial/:id", deleteHistorial);

export default router;
