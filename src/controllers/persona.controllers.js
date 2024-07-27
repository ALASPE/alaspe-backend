import bcrypt from 'bcrypt';
import { Persona } from "../models/Persona.js";

export const getPersonas = async (req, res) => {
    try {
        const personas = await Persona.findAll({
            attributes: ['id', 'CIP', 'nombres', 'apellidos', 'tipo']
        });
        res.json(personas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getPersona = async (req, res) => {
    try {
        const persona = await Persona.findOne({
            where: { DNI: req.params.DNI },
            attributes: ['id', 'CIP', 'nombres', 'apellidos', 'DNI', 'fecha_nacimiento', 'correo_1', 'correo_2', 'telefono_1', 'telefono_2', 'estado', 'rol', 'tipo', 'direccion', 'area_id', 'puesto']
        });

        if (!persona) return res.status(404).json({ message: 'Persona no existe' });
        res.json(persona);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createPersona = async (req, res) => {
    try {
        const { tipo, CIP, DNI, nombres, apellidos, fecha_nacimiento, correo_1, correo_2, telefono_1, telefono_2, password, rol, estado, area_id, puesto } = req.body;

        const existingPersona = await Persona.findOne({ where: { DNI } });

        if (existingPersona) {
            return res.status(400).json({ message: 'Esta persona ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevaPersona = await Persona.create({
            tipo,
            CIP,
            DNI,
            nombres,
            apellidos,
            fecha_nacimiento,
            correo_1,
            correo_2,
            telefono_1,
            telefono_2,
            password: hashedPassword,
            rol,
            estado,
            area_id,
            puesto
        });
        return res.status(201).json(nuevaPersona);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Error de validación', errors: error.errors });
        }
        return res.status(500).json({ message: error.message });
    }
};

export const updatePersona = async (req, res) => {
    try {
        const { DNI } = req.params;
        const { nombres, apellidos, fecha_nacimiento, correo_1, correo_2, telefono_1, telefono_2, estado, rol, area_id, puesto } = req.body;

        const persona = await Persona.findOne({ where: { DNI } });

        if (!persona) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }

        await persona.update({
            nombres,
            apellidos,
            fecha_nacimiento,
            correo_1,
            correo_2,
            telefono_1,
            telefono_2,
            estado,
            rol,
            area_id,
            puesto
        });

        res.json(persona);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Error de validación', errors: error.errors });
        }
        return res.status(500).json({ message: error.message });
    }
};

export const deletePersona = async (req, res) => {
    try {
        const { DNI } = req.params;

        const deleted = await Persona.destroy({
            where: { DNI },
        });

        if (!deleted) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const accVerify = async (req, res) => {
    try {
        const persona = await Persona.findOne({
            where: { DNI: req.params.DNI },
        });

        if (!persona) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }

        if (persona.verified) {
            return res.status(400).json({ message: 'Persona ya verificada' });
        }

        persona.verified = true;
        await persona.save();

        res.json({ message: 'Persona verificada con éxito' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
