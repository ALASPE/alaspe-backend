import { Router } from "express";
import {
  getPagos,
  getPagoById,
  createPago,
  updatePago,
  deletePago
} from "../controllers/pagos.controllers.js";

const router = Router();

router.get("/pagos", getPagos);
router.get("/pagos/:id", getPagoById);
router.post("/pagos", createPago);
router.put("/pagos/:id", updatePago);
router.delete("/pagos/:id", deletePago);

export default router;
