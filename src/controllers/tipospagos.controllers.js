// import { Tipos_Descuentos } from '../models/Tipos_Descuentos.js';

// export const getTiposDescuentos = async (req, res) => {
//     try {
//         const tiposDescuentos = await Tipos_Descuentos.findAll();
//         res.json(tiposDescuentos);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const getTipoDescuento = async (req, res) => {
//     try {
//         const tipoDescuento = await Tipos_Descuentos.findOne({
//             where: { id: req.params.id }
//         });

//         if (!tipoDescuento) return res.status(404).json({ message: 'Tipo de descuento no existe' });
//         res.json(tipoDescuento);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const createTipoDescuento = async (req, res) => {
//     try {
//         const { descripcion } = req.body;

//         const nuevoTipoDescuento = await Tipos_Descuentos.create({
//             descripcion
//         });
//         return res.status(201).json(nuevoTipoDescuento);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const updateTipoDescuento = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { descripcion } = req.body;

//         const tipoDescuento = await Tipos_Descuentos.findOne({ where: { id } });

//         if (!tipoDescuento) {
//             return res.status(404).json({ message: 'Tipo de descuento no encontrado' });
//         }

//         await tipoDescuento.update({
//             descripcion
//         });

//         res.json(tipoDescuento);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const deleteTipoDescuento = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deleted = await Tipos_Descuentos.destroy({
//             where: { id },
//         });

//         if (!deleted) {
//             return res.status(404).json({ message: 'Tipo de descuento no encontrado' });
//         }

//         res.sendStatus(204);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };
