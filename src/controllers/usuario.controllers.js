import bcrypt from 'bcrypt';
import { Usuario } from "../models/Usuario.js";

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: ['CIP', 'Nombres', 'Apellidos']
        });
        res.json(usuarios);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({
            where: { DNI: req.params.DNI },
            attributes: ['CIP', 'Nombres', 'Apellidos', 'DNI', 'Fecha_Nacimiento', 'Correo_1', 'Correo_2', 'Telefono_1', 'Telefono_2', 'Estado', 'Rol']
        });

        if (!usuario) return res.status(404).json({ message: 'Usuario no existe' });
        res.json(usuario);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createUsuario = async (req, res) => {
    try {
        const { CIP, DNI, Nombres, Apellidos, Fecha_Nacimiento, Correo_1, Correo_2, Telefono_1, Telefono_2, Password, Rol, Estado } = req.body;

        const existingUsuario = await Usuario.findOne({ where: { DNI } });

        if (existingUsuario) {
            return res.status(400).json({ message: 'Este usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
        const nuevoUsuario = await Usuario.create({
            CIP,
            DNI,
            Nombres,
            Apellidos,
            Fecha_Nacimiento,
            Correo_1,
            Correo_2,
            Telefono_1,
            Telefono_2,
            Password: hashedPassword,
            Rol,
            Estado
        });
        return res.status(201).json(nuevoUsuario);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Error de validación', errors: error.errors });
        }
        return res.status(500).json({ message: error.message });
    }
};

export const updateUsuario = async (req, res) => {
    try {
        const { DNI } = req.params;
        const { Nombres, Apellidos, Fecha_Nacimiento, Correo_1, Correo_2, Telefono_1, Telefono_2, Estado, Rol } = req.body;

        const usuario = await Usuario.findOne({ where: { DNI } });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await usuario.update({
            Nombres,
            Apellidos,
            Fecha_Nacimiento,
            Correo_1,
            Correo_2,
            Telefono_1,
            Telefono_2,
        });

        res.json(usuario);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Error de validación', errors: error.errors });
        }
        return res.status(500).json({ message: error.message });
    }
};

export const deleteUsuario = async (req, res) => {
    try {
        const { DNI } = req.params;

        const deleted = await Usuario.destroy({
            where: { DNI },
        });

        if (!deleted) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const accVerify = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({
            where: { DNI: req.params.DNI },
        });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (usuario.verified) {
            return res.status(400).json({ message: 'Usuario ya verificado' });
        }

        usuario.verified = true;
        await usuario.save();

        res.json({ message: 'Usuario verificado con éxito' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
