import bcrypt from 'bcrypt';
import { Usuario } from '../models/Usuario.js';

export const loginUser = async (req, res) => {
    try{
        const { DNI, password } = req.body;
        const usuario = await Usuario.findOne(
            {where : {DNI} }
        );
        if(!usuario){
            return res.status(400).json({ message: 'Usuario invalido o contraseña'});
        }

        const isMatch = await bcrypt.compare(password, usuario.password);

        if(!isMatch){
            return res.status(400).json({ message: 'Usuario invalido o contraseña'});
        }

        req.session.CIP = usuario.CIP;
        req.session.DNI = usuario.DNI;
        
        return res.status(200).json({ message: 'Inicio de sesión exitoso' })
    } catch(error){
        return res.status(500).json({ message: error.message });
    }
};

export const logoutUser = (res, req) => {
    req.session.destroy(err => {
        if(err){
            return res.status(500).json({ message: '' })
        }
        res.clearCookie('connect.sid');
        return res.status(200).json({ message: 'Cierre de sesión exitoso' })
    })
}