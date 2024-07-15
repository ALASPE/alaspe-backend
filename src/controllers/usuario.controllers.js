import bcrypt from 'bcrypt';
import { Usuario } from "../models/Usuario.js";

export const getUsuarios = async (req, res) => {
    try{
        const usuario = await Usuario.findAll();
        res.json(usuario);
    } catch(error){
        return res.status(500).json( { message: error.message });
    }
};

export const getUsuario = async (req, res) => {
    try{
        const usuario = await Usuario.findOne({
            where: { DNI: req.params.DNI }
        });

        if(!usuario) return res.status(500).json( { message: 'Usuario no existe' });
        res.json(usuario);
    } catch(error){
        return res.status(500).json( { message: error.message });
    }
};

export const createUsuario = async (req, res) => {
    try{
        const existingUsuario = await Usuario.findOne({ where: { DNI: req.body.DNI }});

        if(existingUsuario){
            return res.status(400).json({ message: 'Este usuario ya existe' })
        }

        const hashedPassword = await bcrypt.hash(req.body.Password, 10)
        const nuevoUsuario = await Usuario.create({
            CIP: req.body.CIP,
            DNI: req.body.DNI,
            Nombres: req.body.Nombres,
            Apellidos: req.body.Apellidos,
            Fecha_Nacimiento: req.body.Fecha_Nacimiento,
            Correo_1: req.body.Correo_1,
            Correo_2: req.body.Correo_2,
            Telefono_1: req.body.Telefono_1,
            Telefono_2:  req.body.Telefono_2,
            Password: hashedPassword,
        });
        return res.status(201).json(nuevoUsuario);
    } catch(error){
        return res.status(500).json( { message: error.message });
    }
};

export const updateUsuario = async (req, res) => {
    try {
      const dni = req.params.DNI;
      const usuario = await Usuario.findByPk(dni);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      await usuario.update({
        Nombres: req.body.Nombres,
        Apellidos: req.body.Apellidos,
        Fecha_Nacimiento: req.body.Fecha_Nacimiento,
        Correo_1: req.body.Correo_1,
        Correo_2: req.body.Correo_2,
        Telefono_1: req.body.Telefono_1,
        Telefono_2: req.body.Telefono_2,
      });
  
      res.json(usuario);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: 'Error de validación', errors: error.errors });
      }
      return res.status(500).json({ message: error.message });
    }
  };

export const deleteUsuario = async (req, res) => {
    try{
        await Usuario.destroy({
            where: { DNI: req.params.DNI },
        });
        res.sendStatus(204);
    } catch(error){
        return res.status(500).json( { message: error.message });
    };
};

export const accVerify = async (res, req) => {
    try{
        const usuario = await Usuario.findOne({
            where: { DNI: req.params.DNI }, 
        })
        if(usuario.verified){
            return res.status(400).json({ message: 'Usuario ya verificado' })
        }
    } catch(e){

    }
}