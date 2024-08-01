import { Aportes } from "../models/Aportes.js";
import { Socios } from "../models/Socios.js";
import { Cuentas } from "../models/Cuentas.js";

export const getAportes = async (req, res) => {
  try {
    const aportes = await Aportes.findAll({
      include: [
        {
          model: Socios,
          attributes: ["dni", "nombre", "apellido"],
        },
      ],
    });
    res.json(aportes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAporte = async (req, res) => {
  try {
    const aporte = await Aportes.findOne({
      where: { aportes_id: req.params.id },
      include: [
        {
          model: Socios,
          attributes: ["dni", "nombre", "apellido"],
        },
      ],
    });

    if (!aporte) return res.status(404).json({ message: "Aporte no encontrado" });

    res.json(aporte);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createAporte = async (req, res) => {
  try {
    const { socio_id, monto_aporte, monto_prevision, fecha } = req.body;

    const socio = await Socios.findOne({ where: { socio_id } });
    if (!socio) {
      return res.status(404).json({ message: "Socio no encontrado" });
    }

    const newAporte = await Aportes.create({
      socio_id,
      monto_aporte,
      monto_prevision,
      fecha,
    });

    const cuenta = await Cuentas.findOne({ where: { socio_id } });
    if (cuenta) {
      cuenta.saldo_aporte += parseFloat(monto_aporte);
      cuenta.saldo_prevision += parseFloat(monto_prevision);
      await cuenta.save();
    }

    return res.status(201).json(newAporte);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: "Error de validación", errors: error.errors });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const updateAporte = async (req, res) => {
  try {
    const { id } = req.params;
    const { monto_aporte, monto_prevision, fecha } = req.body;

    const aporte = await Aportes.findOne({ where: { aportes_id: id } });

    if (!aporte) {
      return res.status(404).json({ message: "Aporte no encontrado" });
    }

    await aporte.update({
      monto_aporte,
      monto_prevision,
      fecha,
    });

    res.json(aporte);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: "Error de validación", errors: error.errors });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const deleteAporte = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAporte = await Aportes.destroy({
      where: { aportes_id: id },
    });

    if (!deletedAporte) {
      return res.status(404).json({ message: "Aporte no encontrado" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
