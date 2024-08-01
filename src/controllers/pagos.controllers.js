// import { Pagos } from '../models/Pagos.js';
// import { Prestamos } from '../models/Prestamos.js';

// export const getPagos = async (req, res) => {
//     try {
//         const pagos = await Pagos.findAll({
//             include: {
//                 model: Prestamos,
//                 attributes: ['monto']
//             }
//         });
//         res.json(pagos);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const getPago = async (req, res) => {
//     try {
//         const pago = await Pagos.findOne({
//             where: { id: req.params.id },
//             include: {
//                 model: Prestamos,
//                 attributes: ['monto']
//             }
//         });

//         if (!pago) return res.status(404).json({ message: 'Pago no existe' });
//         res.json(pago);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const createPago = async (req, res) => {
//     try {
//         const { prestamo_id, tipo_pago, fecha, monto } = req.body;

//         const nuevoPago = await Pagos.create({
//             prestamo_id,
//             tipo_pago,
//             fecha,
//             monto
//         });
//         return res.status(201).json(nuevoPago);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const updatePago = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { tipo_pago, fecha, monto } = req.body;

//         const pago = await Pagos.findOne({ where: { id } });

//         if (!pago) {
//             return res.status(404).json({ message: 'Pago no encontrado' });
//         }

//         await pago.update({
//             tipo_pago,
//             fecha,
//             monto
//         });

//         res.json(pago);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const deletePago = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deleted = await Pagos.destroy({
//             where: { id },
//         });

//         if (!deleted) {
//             return res.status(404).json({ message: 'Pago no encontrado' });
//         }

//         res.sendStatus(204);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };
