import { Pagos_Mensuales } from '../models/Pagos_Mensuales.js';
import { Cuentas } from '../models/Cuentas.js';

export const getPagosMensuales = async (req, res) => {
    try {
        const pagosMensuales = await Pagos_Mensuales.findAll({
            include: {
                model: Cuentas,
                attributes: ['tipo']
            }
        });
        res.json(pagosMensuales);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getPagoMensual = async (req, res) => {
    try {
        const pagoMensual = await Pagos_Mensuales.findOne({
            where: { id: req.params.id },
            include: {
                model: Cuentas,
                attributes: ['tipo']
            }
        });

        if (!pagoMensual) return res.status(404).json({ message: 'Pago mensual no existe' });
        res.json(pagoMensual);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createPagoMensual = async (req, res) => {
    try {
        const { cuenta_id, fecha, monto_seguro, monto_prevision } = req.body;

        const nuevoPagoMensual = await Pagos_Mensuales.create({
            cuenta_id,
            fecha,
            monto_seguro,
            monto_prevision
        });
        return res.status(201).json(nuevoPagoMensual);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updatePagoMensual = async (req, res) => {
    try {
        const { id } = req.params;
        const { fecha, monto_seguro, monto_prevision } = req.body;

        const pagoMensual = await Pagos_Mensuales.findOne({ where: { id } });

        if (!pagoMensual) {
            return res.status(404).json({ message: 'Pago mensual no encontrado' });
        }

        await pagoMensual.update({
            fecha,
            monto_seguro,
            monto_prevision
        });

        res.json(pagoMensual);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deletePagoMensual = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Pagos_Mensuales.destroy({
            where: { id },
        });

        if (!deleted) {
            return res.status(404).json({ message: 'Pago mensual no encontrado' });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
