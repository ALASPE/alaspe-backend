// import { Router } from "express";
// import {
//     getAportes,
//     getAporte,
//     createAporte,
//     updateAporte,
//     deleteAporte
// } from '../controllers/aportes.controllers.js';
// import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

// const router = Router();

// router.get('/aportes', authenticateToken, authorizeRoles("admin", "empleado", "socio"), getAportes);
// router.get('/aportes/:id', authenticateToken, authorizeRoles("admin", "empleado", "socio"), getAporte);
// router.post('/aportes', authenticateToken, authorizeRoles("admin", "empleado"), createAporte);
// router.put('/aportes/:id', authenticateToken, authorizeRoles("admin", "empleado"), updateAporte);
// router.delete('/aportes/:id', authenticateToken, authorizeRoles("admin", "empleado"), deleteAporte);

// export default router;
