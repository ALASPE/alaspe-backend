import bcrypt from "bcrypt";
import { Socios } from "../models/Socios.js";
import moment from "moment";

export const getSocios = async (req, res) => {
  try {
    const socios = await Socios.findAll({
      attributes: [
        "dni",
        "cip",
        "nombre",
        "apellido",
        "direccion",
        "fecha_nacimiento",
        "telefono",
        "correo",
        "estado",
      ],
    });

    socios.forEach(socio => {
      socio.fecha_nacimiento = moment(socio.fecha_nacimiento).format('DD/MM/YYYY');
    });

    res.json(socios);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSocio = async (req, res) => {
  try {
    const socio = await Socios.findOne({
      where: { dni: req.params.dni },
      attributes: [
        "dni",
        "cip",
        "nombre",
        "apellido",
        "direccion",
        "fecha_nacimiento",
        "telefono",
        "correo",
        "estado",
      ],
    });

    if (!socio) return res.status(404).json({ message: "Socio no existe" });

    socio.fecha_nacimiento = moment(socio.fecha_nacimiento).format('DD/MM/YYYY');
    
    res.json(socio);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createSocio = async (req, res) => {
  try {
    const {
      dni,
      cip,
      nombre,
      apellido,
      direccion,
      fecha_nacimiento,
      telefono,
      correo,
      password,
    } = req.body;

    const existingSocio = await Socios.findOne({ where: { dni } });

    if (existingSocio) {
      return res.status(400).json({ message: "Este socio ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newSocio = await Socios.create({
      dni,
      cip,
      nombre,
      apellido,
      direccion,
      fecha_nacimiento: moment(fecha_nacimiento, 'DD/MM/YYYY').toDate(),
      telefono,
      correo,
      password: hashedPassword,
    });
    return res.status(201).json(newSocio);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: "Error de validación", errors: error.errors });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const updateSocio = async (req, res) => {
  try {
    const { dni } = req.params;
    const {
      cip,
      nombre,
      apellido,
      direccion,
      fecha_nacimiento,
      telefono,
      correo,
      estado,
    } = req.body;

    const socio = await Socios.findOne({ where: { dni } });

    if (!socio) {
      return res.status(404).json({ message: "Socio no encontrado" });
    }

    await socio.update({
      cip,
      nombre,
      apellido,
      direccion,
      fecha_nacimiento: moment(fecha_nacimiento, 'DD/MM/YYYY').toDate(),
      telefono,
      correo,
      estado,
    });

    socio.fecha_nacimiento = moment(socio.fecha_nacimiento).format('DD/MM/YYYY');

    res.json(socio);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: "Error de validación", errors: error.errors });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const deleteSocio = async (req, res) => {
  try {
    const { dni } = req.params;

    const deletedSocio = await Socios.destroy({
      where: { dni },
    });

    if (!deletedSocio) {
      return res.status(404).json({ message: "Socio no encontrado" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const accVerify = async (req, res) => {
  try {
    const socio = await Socios.findOne({
      where: { dni: req.params.dni },
    });

    if (!socio) {
      return res.status(404).json({ message: "Socio no encontrado" });
    }

    if (socio.verified) {
      return res.status(400).json({ message: "Socio ya verficado" });
    }

    socio.verified = true;
    await socio.save();

    res.json({ message: "Socio verificado con éxito" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
