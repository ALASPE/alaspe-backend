import { Socio } from "../models/socio.js";

export const getSocios = async (req, res) => {
    try{
        const socio = await Socio.findAll();
        res.json(socio);
    } catch(error){
        return res.status(500).json( { message: error.message });
    }
};

export const getSocio = async (req, res) => {
    try{
        const socio = await Socio.findOne({
            where: { codigo_socio: req.params.codigo_socio }
        });

        if(!socio) return res.status(500).json( { message: 'User does not exist' });
        res.json(socio);
    } catch(error){
        return res.status(500).json( { message: error.message });
    }
};

export const createSocio = async (req, res) => {
    try{
        const newSocio = await Socio.create({
            socio_codigo: req.body.socio_codigo,
            dni_socio: req.body.dni_socio,
            nombre_socio: req.body.nombre_socio,
            apellido_socio: req.body.apellido_socio,
            correo_socio: req.body.correo_socio,
            fecha_nac_socio: req.body.fecha_nac_socio,
            password_socio: req.body.password_socio,
        });
        res.json(newSocio);
    } catch(error){
        return res.status(500).json( { message: error.message });
    }
};

export const updateSocio = async (req, res) => {
    try{
        await Socio.update({
            socio_codigo: req.body.socio_codigo,
            dni_socio: req.body.dni_socio,
            nombre_socio: req.body.nombre_socio,
            apellido_socio: req.body.apellido_socio,
            correo_socio: req.body.correo_socio,
            fecha_nac_socio: req.body.fecha_nac_socio,
            password_socio: req.body.password_socio,
        },{
            where: { codigo_socio: req.params.codigo_socio }
        });
        res.json(Socio)
    } catch(error){
        return res.status(500).json( { message: error.message });
    }
};

export const deleteSocio = async (req, res) => {
    try{
        await Socio.destroy({
            where: { codigo_socio: req.params.codigo_socio },
        });
        res.sendStatus(204);
    } catch(error){
        return res.status(500).json( { message: error.message });
    };
};