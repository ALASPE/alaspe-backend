import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Usuarios } from '../models/Usuarios.js';
import { Socios } from '../models/Socios.js';

export const authenticateToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Acceso denegado' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Usuarios.findOne({ where: { usuario_id: decoded.id } });

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido' });
    }
};


export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.rol)) {
            return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta' });
        }
        next();
    };
};

export const authenticateSocioToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Acceso denegado' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const socio = await Socios.findOne({ where: { dni: decoded.dni } });

        if (!socio) {
            return res.status(401).json({ message: 'Socio no encontrado' });
        }

        req.socio = socio;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido' });
    }
};
