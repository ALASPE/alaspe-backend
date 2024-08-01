// import { Router } from "express";
// import {
//     getAccioness,
//     getAcciones,
//     createAcciones,
//     updateAcciones,
//     deleteAcciones
// } from '../controllers/acciones.controllers.js';
// import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

// const router = Router();

// router.get('/acciones', authenticateToken, authorizeRoles("administrador", "empleado"), getAccioness);
// router.get('/acciones/:id', authenticateToken, authorizeRoles("administrador", "empleado"), getAcciones);
// router.post('/acciones', authenticateToken, authorizeRoles("administrador", "empleado"), createAcciones);
// router.put('/acciones/:id', authenticateToken, authorizeRoles("administrador", "empleado"), updateAcciones);
// router.delete('/acciones/:id', authenticateToken, authorizeRoles("administrador", "empleado"), deleteAcciones);

// export default router;
