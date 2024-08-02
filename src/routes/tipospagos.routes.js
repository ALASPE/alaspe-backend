import { Router } from "express";
import {
  getTiposPagos,
  getTipoPagoById,
  createTipoPago,
  updateTipoPago,
  deleteTipoPago
} from "../controllers/tipospagos.controllers.js";
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.get("/tipospagos", authenticateToken, authorizeRoles("administrador"), getTiposPagos);
router.get("/tipospagos/:id", authenticateToken, authorizeRoles("administrador"), getTipoPagoById);
router.post("/tipospagos", authenticateToken, authorizeRoles("administrador"), createTipoPago);
router.put("/tipospagos/:id", authenticateToken, authorizeRoles("administrador"), updateTipoPago);
router.delete("/tipospagos/:id", authenticateToken, authorizeRoles("administrador"), deleteTipoPago);

export default router;
