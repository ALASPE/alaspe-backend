import { Router } from "express";
import {
    getSocios,
    createSocio,
    updateSocio,
    deleteSocio,
    getSocio
} from '../controllers/socio.controllers.js'


const router = Router();

router.get('/socios', getSocios);
router.post('/socios', createSocio)
router.put('/socios', updateSocio);
router.delete('/socios/:codigo_socio', deleteSocio);
router.get('/socios/:codigo_socio', getSocio);


export default router;