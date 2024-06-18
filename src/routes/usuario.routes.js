import { Router } from "express";
import {
    getUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuario
} from '../controllers/usuario.controllers.js'


const router = Router();

router.get('/usuario', getUsuarios);
router.post('/usuario', createUsuario)
router.put('/usuario', updateUsuario);
router.delete('/usuario/:DNI', deleteUsuario);
router.get('/usuario/:DNI', getUsuario);


export default router;