// import { Aportes } from '../models/Aportes.js';
// import { Persona } from '../models/Persona.js';

// export const getAportes = async (req, res) => {
//     try {
//         const aportes = await Aportes.findAll({
//             include: {
//                 model: Persona,
//                 attributes: ['nombres', 'apellidos']
//             }
//         });
//         res.json(aportes);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const getAporte = async (req, res) => {
//     try {
//         const aporte = await Aportes.findOne({
//             where: { id: req.params.id },
//             include: {
//                 model: Persona,
//                 attributes: ['nombres', 'apellidos']
//             }
//         });

//         if (!aporte) return res.status(404).json({ message: 'Aporte no existe' });
//         res.json(aporte);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const createAporte = async (req, res) => {
//     try {
//         const { socio_id, tipo, monto_cobertura, fecha_inicio, fecha_vencimiento } = req.body;

//         const nuevoAporte = await Aportes.create({
//             socio_id,
//             tipo,
//             monto_cobertura,
//             fecha_inicio,
//             fecha_vencimiento
//         });
//         return res.status(201).json(nuevoAporte);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const updateAporte = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { tipo, monto_cobertura, fecha_inicio, fecha_vencimiento } = req.body;

//         const aporte = await Aportes.findOne({ where: { id } });

//         if (!aporte) {
//             return res.status(404).json({ message: 'Aporte no encontrado' });
//         }

//         await aporte.update({
//             tipo,
//             monto_cobertura,
//             fecha_inicio,
//             fecha_vencimiento
//         });

//         res.json(aporte);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const deleteAporte = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deleted = await Aportes.destroy({
//             where: { id },
//         });

//         if (!deleted) {
//             return res.status(404).json({ message: 'Aporte no encontrado' });
//         }

//         res.sendStatus(204);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };
