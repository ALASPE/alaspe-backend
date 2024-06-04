import { Router } from "express";
import {
    createSocio,
    deleteSocio,
    getSocio,
    getSocios,
    updateSocio
} from '../controllers/socio.controllers.js'


const router = Router();

router.get('./socios', getSocios);
router.post('./socios', createSocio)
router.put('./socios', updateSocio);
router.delete('./socios/:codigo_socio', deleteSocio);
router.get('./socios/:codigo:socio', getSocio);