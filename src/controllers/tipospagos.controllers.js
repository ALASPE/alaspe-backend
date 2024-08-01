import { TiposPagos } from "../models/TiposPagos.js";
import { Aportes } from "../models/Aportes.js";
import { Pagos } from "../models/Pagos.js";
import { registrarAccion } from "../controllers/acciones.controllers.js";

export const getTiposPagos = async (req, res) => {
    try {
      const tiposPagos = await TiposPagos.findAll({
        include: [
          {
            model: Aportes,
            attributes: ["aportes_id", "monto_aporte", "monto_prevision", "fecha"],
          },
          {
            model: Pagos,
            attributes: ["pagos_id", "fecha_pago", "monto"],
          },
        ],
      });
      res.json(tiposPagos);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const getTipoPagoById = async (req, res) => {
    try {
      const tipoPago = await TiposPagos.findOne({
        where: { tipo_pago_id: req.params.id },
        include: [
          {
            model: Aportes,
            attributes: ["aportes_id", "monto_aporte", "monto_prevision", "fecha"],
          },
          {
            model: Pagos,
            attributes: ["pagos_id", "fecha_pago", "monto"],
          },
        ],
      });
  
      if (!tipoPago) return res.status(404).json({ message: "Tipo de pago no encontrado" });
  
      res.json(tipoPago);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const createTipoPago = async (req, res) => {
    try {
      const { descripcion, usuario_id } = req.body;
  
      const newTipoPago = await TiposPagos.create({
        descripcion,
      });

      await registrarAccion(usuario_id, 'Crear TipoPago', `Creó un tipo de pago con ID ${newTipoPago.tipo_pago_id}`);
  
      return res.status(201).json(newTipoPago);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res
          .status(400)
          .json({ message: "Error de validación", errors: error.errors });
      }
      return res.status(500).json({ message: error.message });
    }
  };

  export const updateTipoPago = async (req, res) => {
    try {
      const { id } = req.params;
      const { descripcion, usuario_id } = req.body;
  
      const tipoPago = await TiposPagos.findOne({ where: { tipo_pago_id: id } });
  
      if (!tipoPago) {
        return res.status(404).json({ message: "Tipo de pago no encontrado" });
      }
  
      await tipoPago.update({
        descripcion,
      });

      await registrarAccion(usuario_id, 'Actualizar TipoPago', `Actualizó el tipo de pago con ID ${tipoPago.tipo_pago_id}`);
  
      res.json(tipoPago);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res
          .status(400)
          .json({ message: "Error de validación", errors: error.errors });
      }
      return res.status(500).json({ message: error.message });
    }
  };

  export const deleteTipoPago = async (req, res) => {
    try {
      const { id } = req.params;
      const { usuario_id } = req.body;
  
      const tipoPago = await TiposPagos.findOne({ where: { tipo_pago_id: id } });
  
      if (!tipoPago) {
        return res.status(404).json({ message: "Tipo de pago no encontrado" });
      }
  
      await tipoPago.destroy();

      await registrarAccion(usuario_id, 'Eliminar TipoPago', `Eliminó el tipo de pago con ID ${id}`);
  
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  