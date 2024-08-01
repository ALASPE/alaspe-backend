import { Cuentas } from "../models/Cuentas.js";
import { Socios } from "../models/Socios.js";
import { Aportes } from "../models/Aportes.js";

export const getCuentas = async (req, res) => {
    try {
      const cuentas = await Cuentas.findAll({
        include: [
          {
            model: Socios,
            attributes: ["dni", "nombre", "apellido"],
          },
        ],
      });
      res.json(cuentas);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const getCuenta = async (req, res) => {
    try {
      const cuenta = await Cuentas.findOne({
        where: { cuenta_id: req.params.id },
        include: [
          {
            model: Socios,
            attributes: ["dni", "nombre", "apellido"],
          },
        ],
      });
  
      if (!cuenta) return res.status(404).json({ message: "Cuenta no encontrada" });
  
      res.json(cuenta);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const createCuenta = async (req, res) => {
    try {
      const { socio_id, saldo_aporte, saldo_prevision } = req.body;
  
      const socio = await Socios.findOne({ where: { socio_id } });
      if (!socio) {
        return res.status(404).json({ message: "Socio no encontrado" });
      }
  
      const newCuenta = await Cuentas.create({
        socio_id,
        saldo_aporte: saldo_aporte || 0.0,
        saldo_prevision: saldo_prevision || 0.0,
      });
  
      return res.status(201).json(newCuenta);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res
          .status(400)
          .json({ message: "Error de validación", errors: error.errors });
      }
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const updateCuenta = async (req, res) => {
    try {
      const { id } = req.params;
      const { saldo_aporte, saldo_prevision } = req.body;
  
      const cuenta = await Cuentas.findOne({ where: { cuenta_id: id } });
  
      if (!cuenta) {
        return res.status(404).json({ message: "Cuenta no encontrada" });
      }
  
      await cuenta.update({
        saldo_aporte,
        saldo_prevision,
      });
  
      res.json(cuenta);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res
          .status(400)
          .json({ message: "Error de validación", errors: error.errors });
      }
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const deleteCuenta = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedCuenta = await Cuentas.destroy({
        where: { cuenta_id: id },
      });
  
      if (!deletedCuenta) {
        return res.status(404).json({ message: "Cuenta no encontrada" });
      }
  
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const registrarAporte = async (req, res) => {
    try {
      const { socio_id, monto_aporte, monto_prevision } = req.body;
  
      const socio = await Socios.findOne({ where: { socio_id } });
      if (!socio) {
        return res.status(404).json({ message: "Socio no encontrado" });
      }
  
      const cuenta = await Cuentas.findOne({ where: { socio_id } });
      if (!cuenta) {
        return res.status(404).json({ message: "Cuenta no encontrada" });
      }
  
      await Aportes.create({
        socio_id,
        monto_aporte,
        monto_prevision,
        fecha: new Date(),
      });
  
      cuenta.saldo_aporte += parseFloat(monto_aporte);
      cuenta.saldo_prevision += parseFloat(monto_prevision);
      await cuenta.save();
  
      res.json(cuenta);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  