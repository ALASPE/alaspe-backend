import bcrypt from "bcrypt";
import { Usuarios } from "../models/Usuarios.js"; // Asegúrate de que la ruta sea correcta

export const getUsuarios = async (req, res) => {
    try {
      const usuarios = await Usuarios.findAll({
        attributes: ["usuario_id", "nombre", "apellido", "correo", "rol"]
      });
      res.json(usuarios);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const getUsuario = async (req, res) => {
    try {
      const usuario = await Usuarios.findOne({
        where: { usuario_id: req.params.id },
        attributes: ["usuario_id", "nombre", "apellido", "correo", "rol"]
      });
  
      if (!usuario) return res.status(404).json({ message: "Usuario no existe" });
  
      res.json(usuario);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const createUsuario = async (req, res) => {
    try {
      const { usuario_id, nombre, apellido, correo, password, rol } = req.body;
  
      const existingUsuario = await Usuarios.findOne({ where: { usuario_id } });
  
      if (existingUsuario) {
        return res.status(400).json({ message: "Este usuario ya existe" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUsuario = await Usuarios.create({
        usuario_id,
        nombre,
        apellido,
        correo,
        password: hashedPassword,
        rol
      });
  
      return res.status(201).json(newUsuario);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res
          .status(400)
          .json({ message: "Error de validación", errors: error.errors });
      }
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const updateUsuario = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, apellido, correo, password, rol } = req.body;
  
      const usuario = await Usuarios.findOne({ where: { usuario_id: id } });
  
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      const hashedPassword = password ? await bcrypt.hash(password, 10) : usuario.password;
  
      await usuario.update({
        nombre,
        apellido,
        correo,
        password: hashedPassword,
        rol
      });
  
      res.json(usuario);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res
          .status(400)
          .json({ message: "Error de validación", errors: error.errors });
      }
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const deleteUsuario = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedUsuario = await Usuarios.destroy({
        where: { usuario_id: id }
      });
  
      if (!deletedUsuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  