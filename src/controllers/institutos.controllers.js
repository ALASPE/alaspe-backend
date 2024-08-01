import { Institucion } from "../models/Institutos.js";
import { Socios } from "../models/Socios.js";

export const getInstituciones = async (req, res) => {
    try {
      const instituciones = await Institucion.findAll({
        include: [
          {
            model: Socios,
            attributes: ["dni", "nombre", "apellido"],
          },
        ],
      });
      res.json(instituciones);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const getInstitucionById = async (req, res) => {
    try {
      const institucion = await Institucion.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: Socios,
            attributes: ["dni", "nombre", "apellido"],
          },
        ],
      });
  
      if (!institucion) return res.status(404).json({ message: "Institución no encontrada" });
  
      res.json(institucion);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
export const createInstitucion = async (req, res) => {
    try {
      const { id, descripcion } = req.body;
  
      const newInstitucion = await Institucion.create({
        id,
        descripcion,
      });
  
      return res.status(201).json(newInstitucion);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res
          .status(400)
          .json({ message: "Error de validación", errors: error.errors });
      }
      return res.status(500).json({ message: error.message });
    }
  };

  export const updateInstitucion = async (req, res) => {
    try {
      const { id } = req.params;
      const { descripcion } = req.body;
  
      const institucion = await Institucion.findOne({ where: { id } });
  
      if (!institucion) {
        return res.status(404).json({ message: "Institución no encontrada" });
      }
  
      await institucion.update({
        descripcion,
      });
  
      res.json(institucion);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res
          .status(400)
          .json({ message: "Error de validación", errors: error.errors });
      }
      return res.status(500).json({ message: error.message });
    }
  };

  export const deleteInstitucion = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedInstitucion = await Institucion.destroy({
        where: { id },
      });
  
      if (!deletedInstitucion) {
        return res.status(404).json({ message: "Institución no encontrada" });
      }
  
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  