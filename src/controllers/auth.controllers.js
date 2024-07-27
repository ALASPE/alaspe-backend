import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/session.config.js';
import { Persona } from '../models/Persona.js';

export const loginUser = async (req, res) => {
    try {
        const { DNI, Password } = req.body;

        const user = await Persona.findOne({ where: { DNI } });
        if (!user) return res.status(400).json({ message: 'DNI o contraseña inválidos.' });
        
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) return res.status(400).json({ message: 'DNI o contraseña inválidos.' });

        const token = jwt.sign(
            { id: user.CIP, DNI: user.DNI, Rol: user.Rol },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60
        });

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            redirectUrl: user.Rol === 'admin' ? '/admin' : '/user'
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const logoutUser = (req, res) => {
    res
        .clearCookie('access_token')
        .status(200)
        .json({ message: 'Cierre de sesión exitoso.' });
};

export const verifySession = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ message: 'No autorizado' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });

        res.status(200).json({ message: `Hola, ${user.DNI}!`, user });
    });
};
