import { Acciones } from "../models/Acciones.js";
import { Usuarios } from "../models/Usuarios.js";

export const getAcciones = async (req, res) => {
  try {
    const acciones = await Acciones.findAll({
      include: [
        {
          model: Usuarios,
          attributes: ["usuario_id", "nombre", "apellido", "rol"],
        },
      ],
    });
    res.json(acciones);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAccion = async (req, res) => {
  try {
    const accion = await Acciones.findOne({
      where: { accion_id: req.params.id },
      include: [
        {
          model: Usuarios,
          attributes: ["usuario_id", "nombre", "apellido", "rol"],
        },
      ],
    });

    if (!accion) return res.status(404).json({ message: "Acción no encontrada" });

    res.json(accion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createAccion = async (req, res) => {
  try {
    const { usuario_id, accion, descripcion } = req.body;

    const usuario = await Usuarios.findOne({ where: { usuario_id } });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const newAccion = await Acciones.create({
      usuario_id,
      accion,
      descripcion,
      fecha: new Date(),
    });

    return res.status(201).json(newAccion);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: "Error de validación", errors: error.errors });
    }
    return res.status(500).json({ message: error.message });
  }
};
export const registrarAccion = async (usuario_id, accion, descripcion) => {
  try {
    await Acciones.create({
      usuario_id,
      accion,
      descripcion,
      fecha: new Date(),
    });
  } catch (error) {
    console.error("Error registrando la acción: ", error);
  }
};
