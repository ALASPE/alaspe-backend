// import { Areas } from '../models/Areas.js';

// export const getAreas = async (req, res) => {
//     try {
//         const areas = await Areas.findAll();
//         res.json(areas);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const getArea = async (req, res) => {
//     try {
//         const area = await Areas.findOne({
//             where: { id: req.params.id }
//         });

//         if (!area) return res.status(404).json({ message: 'Área no existe' });
//         res.json(area);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const createArea = async (req, res) => {
//     try {
//         const { nombre } = req.body;

//         const nuevaArea = await Areas.create({
//             nombre
//         });
//         return res.status(201).json(nuevaArea);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const updateArea = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { nombre } = req.body;

//         const area = await Areas.findOne({ where: { id } });

//         if (!area) {
//             return res.status(404).json({ message: 'Área no encontrada' });
//         }

//         await area.update({
//             nombre
//         });

//         res.json(area);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const deleteArea = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deleted = await Areas.destroy({
//             where: { id },
//         });

//         if (!deleted) {
//             return res.status(404).json({ message: 'Área no encontrada' });
//         }

//         res.sendStatus(204);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };
