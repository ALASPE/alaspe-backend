import { Institutos } from "../models/Institutos.js";
import { Socios } from "../models/Socios.js";

export const getInstitutos = async (req, res) => {
    try {
      const institutos = await Institutos.findAll({
        include: [
          {
            model: Socios,
            attributes: ["dni", "nombre", "apellido"],
          },
        ],
      });
      res.json(institutos);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const getInstituto = async (req, res) => {
    try {
      const institutos = await Institutos.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: Socios,
            attributes: ["dni", "nombre", "apellido"],
          },
        ],
      });
  
      if (!institutos) return res.status(404).json({ message: "Institución no encontrada" });
  
      res.json(institutos);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
export const createInstituto = async (req, res) => {
    try {
      const { id, descripcion } = req.body;
  
      const newInstituto = await Institutos.create({
        id,
        descripcion,
      });
  
      return res.status(201).json(newInstituto);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res
          .status(400)
          .json({ message: "Error de validación", errors: error.errors });
      }
      return res.status(500).json({ message: error.message });
    }
  };

  export const updateInstituto = async (req, res) => {
    try {
      const { id } = req.params;
      const { descripcion } = req.body;
  
      const institutos = await Institutos.findOne({ where: { id } });
  
      if (!institutos) {
        return res.status(404).json({ message: "Institución no encontrada" });
      }
  
      await institutos.update({
        descripcion,
      });
  
      res.json(institutos);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res
          .status(400)
          .json({ message: "Error de validación", errors: error.errors });
      }
      return res.status(500).json({ message: error.message });
    }
  };

  export const deleteInstituto = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedInstituto = await Institutos.destroy({
        where: { id },
      });
  
      if (!deletedInstituto) {
        return res.status(404).json({ message: "Institución no encontrada" });
      }
  
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  