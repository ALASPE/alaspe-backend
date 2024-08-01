// import { Router } from "express";
// import {
//     getPagos,
//     getPago,
//     createPago,
//     updatePago,
//     deletePago
// } from '../controllers/pagos.controllers.js';
// import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

// const router = Router();

// router.get('/pagos', authenticateToken, authorizeRoles("admin", "empleado", "socio"), getPagos);
// router.get('/pagos/:id', authenticateToken, authorizeRoles("admin", "empleado", "socio"), getPago);
// router.post('/pagos', authenticateToken, authorizeRoles("admin", "empleado"), createPago);
// router.put('/pagos/:id', authenticateToken, authorizeRoles("admin", "empleado"), updatePago);
// router.delete('/pagos/:id', authenticateToken, authorizeRoles("admin", "empleado"), deletePago);

// export default router;
