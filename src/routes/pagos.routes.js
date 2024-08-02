import { Router } from "express";
import {
  getPagos,
  getPagoById,
  createPago,
  updatePago,
  deletePago
} from "../controllers/pagos.controllers.js";
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.get("/pagos", authenticateToken, authorizeRoles("administrador", "empleado", "socio"), getPagos);
router.get("/pagos/:id", authenticateToken, authorizeRoles("administrador", "empleado", "socio"), getPagoById);
router.post("/pagos", authenticateToken, authorizeRoles("administrador", "empleado", "socio"), createPago);
router.put("/pagos/:id", authenticateToken, authorizeRoles("administrador", "empleado", "socio"), updatePago);
router.delete("/pagos/:id", authenticateToken, authorizeRoles("administrador", "empleado"), deletePago);

export default router;
