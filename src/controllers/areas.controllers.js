import { Areas } from "../models/Areas.js";
import { Usuarios } from "../models/Usuarios.js";

export const getAreas = async (req, res) => {
  try {
    const areas = await Areas.findAll({
      include: [
        {
          model: Usuarios,
          attributes: ["usuario_id", "nombre", "apellido", "correo"],
        },
      ],
    });
    res.json(areas);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getArea = async (req, res) => {
  try {
    const area = await Areas.findOne({
      where: { area_id: req.params.id },
      include: [
        {
          model: Usuarios,
          attributes: ["usuario_id", "nombre", "apellido", "correo"],
        },
      ],
    });

    if (!area) return res.status(404).json({ message: "Área no encontrada" });

    res.json(area);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createArea = async (req, res) => {
  try {
    const { nombre_area } = req.body;

    const newArea = await Areas.create({
      nombre_area,
    });

    return res.status(201).json(newArea);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: "Error de validación", errors: error.errors });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const updateArea = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_area } = req.body;

    const area = await Areas.findOne({ where: { area_id: id } });

    if (!area) {
      return res.status(404).json({ message: "Área no encontrada" });
    }

    await area.update({
      nombre_area,
    });

    res.json(area);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: "Error de validación", errors: error.errors });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const deleteArea = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedArea = await Areas.destroy({
      where: { area_id: id },
    });

    if (!deletedArea) {
      return res.status(404).json({ message: "Área no encontrada" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
