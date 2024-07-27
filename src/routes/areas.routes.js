import { Router } from "express";
import {
    getAreas,
    getArea,
    createArea,
    updateArea,
    deleteArea
} from '../controllers/areas.controllers.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/areas', authenticateToken, authorizeRoles("admin", "empleado"), getAreas);
router.get('/areas/:id', authenticateToken, authorizeRoles("admin", "empleado"), getArea);
router.post('/areas', authenticateToken, authorizeRoles("admin"), createArea);
router.put('/areas/:id', authenticateToken, authorizeRoles("admin"), updateArea);
router.delete('/areas/:id', authenticateToken, authorizeRoles("admin"), deleteArea);

export default router;
