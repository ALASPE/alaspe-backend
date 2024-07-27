import { Router } from "express";
import {
    getPersonas,
    createPersona,
    updatePersona,
    deletePersona,
    getPersona
} from '../controllers/persona.controllers.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/persona', authenticateToken, authorizeRoles("admin", "socio", "empleado"), getPersonas);
router.post('/persona', authenticateToken, authorizeRoles("admin"), createPersona);
router.put('/persona/:DNI', authenticateToken, authorizeRoles("admin"), updatePersona);
router.delete('/persona/:DNI', authenticateToken, authorizeRoles("admin"), deletePersona);
router.get('/persona/:DNI', authenticateToken, authorizeRoles("admin", "socio", "empleado"), getPersona);

export default router;
