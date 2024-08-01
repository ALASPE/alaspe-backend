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

router.get("/cuentas", getCuentas);
router.get("/cuentas/:id", getCuenta);
router.post("/cuentas", createCuenta);
router.put("/cuentas/:id", updateCuenta);
router.delete("/cuentas/:id", deleteCuenta);
router.post("/cuentas/:id/aporte", registrarAporte);

export default router;
