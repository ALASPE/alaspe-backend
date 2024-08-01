import { HistorialEstadosPrestamos } from "../models/HistorialEstadosPrestamos.js";
import { Prestamos } from "../models/Prestamos.js";
import { Usuarios } from "../models/Usuarios.js";

export const getHistorial = async (req, res) => {
    try {
      const historial = await HistorialEstadosPrestamos.findAll({
        include: [
          {
            model: Prestamos,
            attributes: ["prestamo_id", "monto", "fecha_solicitud", "fecha_vencimiento"],
          },
          {
            model: Usuarios,
            attributes: ["usuario_id", "nombre", "apellido"],
          },
        ],
      });
      res.json(historial);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const getHistorialById = async (req, res) => {
    try {
      const historial = await HistorialEstadosPrestamos.findOne({
        where: { historial_id: req.params.id },
        include: [
          {
            model: Prestamos,
            attributes: ["prestamo_id", "monto", "fecha_solicitud", "fecha_vencimiento"],
          },
          {
            model: Usuarios,
            attributes: ["usuario_id", "nombre", "apellido"],
          },
        ],
      });
  
      if (!historial) return res.status(404).json({ message: "Registro no encontrado" });
  
      res.json(historial);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const createHistorial = async (req, res) => {
    try {
      const { prestamo_id, usuario_id, estado_anterior, estado_nuevo } = req.body;

      const prestamo = await Prestamos.findOne({ where: { prestamo_id } });
      if (!prestamo) {
        return res.status(404).json({ message: "Préstamo no encontrado" });
      }
  
      const usuario = await Usuarios.findOne({ where: { usuario_id } });
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      const newHistorial = await HistorialEstadosPrestamos.create({
        prestamo_id,
        usuario_id,
        fecha_cambio: new Date(),
        estado_anterior,
        estado_nuevo,
      });
  
      await prestamo.update({ estado: estado_nuevo });
  
      return res.status(201).json(newHistorial);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res
          .status(400)
          .json({ message: "Error de validación", errors: error.errors });
      }
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const updateHistorial = async (req, res) => {
    try {
      const { id } = req.params;
      const { estado_anterior, estado_nuevo } = req.body;
  
      const historial = await HistorialEstadosPrestamos.findOne({ where: { historial_id: id } });
  
      if (!historial) {
        return res.status(404).json({ message: "Registro no encontrado" });
      }
  
      await historial.update({
        estado_anterior,
        estado_nuevo,
        fecha_cambio: new Date(),
      });
  
      const prestamo = await Prestamos.findOne({ where: { prestamo_id: historial.prestamo_id } });
      if (prestamo) {
        await prestamo.update({ estado: estado_nuevo });
      }
  
      res.json(historial);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res
          .status(400)
          .json({ message: "Error de validación", errors: error.errors });
      }
      return res.status(500).json({ message: error.message });
    }
  };

  export const deleteHistorial = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedHistorial = await HistorialEstadosPrestamos.destroy({
        where: { historial_id: id },
      });
  
      if (!deletedHistorial) {
        return res.status(404).json({ message: "Registro no encontrado" });
      }
  
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  