import { Router } from "express";
import {
    createServicio,
    deleteServicio,
    getServicio,
    getServicios,
    updateServicio,
} from '../controllers/servicio.controllers.js'


const router = Router();

router.get('/servicios', getServicios);
router.post('/servicios', createServicio)
router.put('/servicios', updateServicio);
router.delete('/servicios/:codigo_servicio', deleteServicio);
router.get('/servicios/:codigo_servicio', getServicio);


export default router;