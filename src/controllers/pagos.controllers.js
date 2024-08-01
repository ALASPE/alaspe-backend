import { Pagos } from "../models/Pagos.js";
import { Prestamos } from "../models/Prestamos.js";
import { registrarAccion } from "../controllers/acciones.controllers.js";

export const getPagos = async (req, res) => {
    try {
      const pagos = await Pagos.findAll({
        include: [
          {
            model: Prestamos,
            attributes: ["prestamos_id", "monto_total", "fecha_vencimiento"],
          },
        ],
      });
      res.json(pagos);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const getPagoById = async (req, res) => {
    try {
      const pago = await Pagos.findOne({
        where: { pagos_id: req.params.id },
        include: [
          {
            model: Prestamos,
            attributes: ["prestamos_id", "monto_total", "fecha_vencimiento"],
          },
        ],
      });
  
      if (!pago) return res.status(404).json({ message: "Pago no encontrado" });
  
      res.json(pago);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const createPago = async (req, res) => {
    try {
      const { prestamos_id, fecha_pago, monto, usuario_id } = req.body;

      const prestamo = await Prestamos.findOne({ where: { prestamos_id } });
      if (!prestamo) {
        return res.status(404).json({ message: "Préstamo no encontrado" });
      }
  
      const newPago = await Pagos.create({
        prestamos_id,
        fecha_pago,
        monto,
      });

      prestamo.monto_pagado += parseFloat(monto);
      await prestamo.save();

      await registrarAccion(usuario_id, 'Crear Pago', `Creó un pago con ID ${newPago.pagos_id} para el préstamo con ID ${prestamo.prestamos_id}`);
  
      return res.status(201).json(newPago);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res
          .status(400)
          .json({ message: "Error de validación", errors: error.errors });
      }
      return res.status(500).json({ message: error.message });
    }
  };

  export const updatePago = async (req, res) => {
    try {
      const { id } = req.params;
      const { fecha_pago, monto, usuario_id } = req.body;
  
      const pago = await Pagos.findOne({ where: { pagos_id: id } });
  
      if (!pago) {
        return res.status(404).json({ message: "Pago no encontrado" });
      }

      await pago.update({
        fecha_pago,
        monto,
      });

      const prestamo = await Prestamos.findOne({ where: { prestamos_id: pago.prestamos_id } });
      if (prestamo) {
        prestamo.monto_pagado = await Pagos.sum('monto', { where: { prestamos_id: prestamo.prestamos_id } });
        await prestamo.save();
      }

      await registrarAccion(usuario_id, 'Actualizar Pago', `Actualizó el pago con ID ${pago.pagos_id} para el préstamo con ID ${pago.prestamos_id}`);
  
      res.json(pago);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res
          .status(400)
          .json({ message: "Error de validación", errors: error.errors });
      }
      return res.status(500).json({ message: error.message });
    }
  };

  export const deletePago = async (req, res) => {
    try {
      const { id } = req.params;
      const { usuario_id } = req.body;
  
      const pago = await Pagos.findOne({ where: { pagos_id: id } });
  
      if (!pago) {
        return res.status(404).json({ message: "Pago no encontrado" });
      }
  
      const prestamoId = pago.prestamos_id;
  
      await pago.destroy();

      const prestamo = await Prestamos.findOne({ where: { prestamos_id: prestamoId } });
      if (prestamo) {
        prestamo.monto_pagado = await Pagos.sum('monto', { where: { prestamos_id: prestamoId } });
        await prestamo.save();
      }

      await registrarAccion(usuario_id, 'Eliminar Pago', `Eliminó el pago con ID ${id} para el préstamo con ID ${prestamoId}`);
  
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
