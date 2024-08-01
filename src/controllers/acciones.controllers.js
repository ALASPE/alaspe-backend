// import { Acciones } from '../models/Acciones.js';
// import { Persona } from '../models/Persona.js';

// export const getAcciones = async (req, res) => {
//     try {
//         const acciones = await Acciones.findAll({
//             include: {
//                 model: Persona,
//                 attributes: ['nombres', 'apellidos']
//             }
//         });
//         res.json(auditorias);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const getAuditoria = async (req, res) => {
//     try {
//         const auditoria = await Auditoria.findOne({
//             where: { id: req.params.id },
//             include: {
//                 model: Persona,
//                 attributes: ['nombres', 'apellidos']
//             }
//         });

//         if (!auditoria) return res.status(404).json({ message: 'Auditoría no existe' });
//         res.json(auditoria);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const createAuditoria = async (req, res) => {
//     try {
//         const { empleado_id, accion, fecha, descripcion } = req.body;

//         const nuevaAuditoria = await Auditoria.create({
//             empleado_id,
//             accion,
//             fecha,
//             descripcion
//         });
//         return res.status(201).json(nuevaAuditoria);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const updateAuditoria = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { accion, fecha, descripcion } = req.body;

//         const auditoria = await Auditoria.findOne({ where: { id } });

//         if (!auditoria) {
//             return res.status(404).json({ message: 'Auditoría no encontrada' });
//         }

//         await auditoria.update({
//             accion,
//             fecha,
//             descripcion
//         });

//         res.json(auditoria);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const deleteAuditoria = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deleted = await Auditoria.destroy({
//             where: { id },
//         });

//         if (!deleted) {
//             return res.status(404).json({ message: 'Auditoría no encontrada' });
//         }

//         res.sendStatus(204);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };
