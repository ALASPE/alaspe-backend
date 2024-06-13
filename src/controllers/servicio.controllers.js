import { Servicio } from "../models/Servicio.js";

export const getServicios = async (req, res) => {
    try{
        const servicio = await servicio.findAll();
        res.json(servicio);
    } catch(error){
        return res.status(500).json( { message: error.message });
    }
};

export const getServicio = async (req, res) => {
    try{
        const servicio = await Servicio.findOne({
            where: { codigo_servicio: req.params.codigo_servicio }
        });

        if(!servicio) return res.status(500).json( { message: 'User does not exist' });
        res.json(servicio);
    } catch(error){
        return res.status(500).json( { message: error.message });
    }
};

export const createServicio = async (req, res) => {
    try{
        const newServicio = await Servicio.create({
            nombre_servicio: req.body.nombre_servicio,
            descripcion_servicio: req.body.descripcion_servicio,
        });
        res.json(newServicio);
    } catch(error){
        return res.status(500).json( { message: error.message });
    }
};

export const updateServicio = async (req, res) => {
    try{
        await Servicio.update({
            nombre_servicio: req.body.nombre_servicio,
            descripcion_servicio: req.body.descripcion_servicio,
        },{
            where: { codigo_servicio: req.params.codigo_servicio }
        });
        res.json(Servicio)
    } catch(error){
        return res.status(500).json( { message: error.message });
    }
};

export const deleteServicio = async (req, res) => {
    try{
        await Servicio.destroy({
            where: { codigo_servicio: req.params.codigo_servicio },
        });
        res.sendStatus(204);
    } catch(error){
        return res.status(500).json( { message: error.message });
    };
};