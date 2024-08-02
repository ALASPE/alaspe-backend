import { Router } from "express";
import {
  getCuentas,
  getCuenta,
  createCuenta,
  updateCuenta,
  deleteCuenta,
  registrarAporte
} from "../controllers/cuentas.controllers.js";
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.get("/cuentas", authenticateToken, authorizeRoles("administrador", "empleado"), getCuentas);
router.get("/cuentas/:id", authenticateToken, authorizeRoles("administrador", "empleado", "socio"), getCuenta);
router.post("/cuentas", authenticateToken, authorizeRoles("administrador", "empleado"), createCuenta);
router.put("/cuentas/:id", authenticateToken, authorizeRoles("administrador", "empleado"), updateCuenta);
router.delete("/cuentas/:id", authenticateToken, authorizeRoles("administrador"), deleteCuenta);
router.post("/cuentas/:id/aporte", authenticateToken, authorizeRoles("administrador", "empleado"), registrarAporte);

export default router;
