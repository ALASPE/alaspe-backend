import { Router } from "express";
import {
  getPrestamos,
  getPrestamoById,
  createPrestamo,
  updatePrestamo,
  deletePrestamo
} from "../controllers/prestamos.controllers.js";

const router = Router();

router.get("/prestamos", getPrestamos);
router.get("/prestamos/:id", getPrestamoById);
router.post("/prestamos", createPrestamo);
router.put("/prestamos/:id", updatePrestamo);
router.delete("/prestamos/:id", deletePrestamo);

export default router;
