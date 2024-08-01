import { Router } from "express";
import {
  getTiposPagos,
  getTipoPagoById,
  createTipoPago,
  updateTipoPago,
  deleteTipoPago
} from "../controllers/tipospagos.controllers.js";

const router = Router();

router.get("/tipospagos", getTiposPagos);
router.get("/tipospagos/:id", getTipoPagoById);
router.post("/tipospagos", createTipoPago);
router.put("/tipospagos/:id", updateTipoPago);
router.delete("/tipospagos/:id", deleteTipoPago);

export default router;
