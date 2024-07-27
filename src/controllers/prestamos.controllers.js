import { Prestamos } from '../models/Prestamos.js';
import { Persona } from '../models/Persona.js';

export const getPrestamos = async (req, res) => {
    try {
        const prestamos = await Prestamos.findAll({
            include: {
                model: Persona,
                attributes: ['nombres', 'apellidos']
            }
        });
        res.json(prestamos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getPrestamo = async (req, res) => {
    try {
        const prestamo = await Prestamos.findOne({
            where: { id: req.params.id },
            include: {
                model: Persona,
                attributes: ['nombres', 'apellidos']
            }
        });

        if (!prestamo) return res.status(404).json({ message: 'Préstamo no existe' });
        res.json(prestamo);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createPrestamo = async (req, res) => {
    try {
        const { socio_id, monto, interes, fecha_desembolso, fecha_vencimiento, estado } = req.body;

        const nuevoPrestamo = await Prestamos.create({
            socio_id,
            monto,
            interes,
            fecha_desembolso,
            fecha_vencimiento,
            estado
        });
        return res.status(201).json(nuevoPrestamo);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updatePrestamo = async (req, res) => {
    try {
        const { id } = req.params;
        const { monto, interes, fecha_desembolso, fecha_vencimiento, estado } = req.body;

        const prestamo = await Prestamos.findOne({ where: { id } });

        if (!prestamo) {
            return res.status(404).json({ message: 'Préstamo no encontrado' });
        }

        await prestamo.update({
            monto,
            interes,
            fecha_desembolso,
            fecha_vencimiento,
            estado
        });

        res.json(prestamo);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deletePrestamo = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Prestamos.destroy({
            where: { id },
        });

        if (!deleted) {
            return res.status(404).json({ message: 'Préstamo no encontrado' });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
