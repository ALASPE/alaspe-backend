// import { Transacciones } from '../models/Transacciones.js';
// import { Cuentas } from '../models/Cuentas.js';

// export const getTransacciones = async (req, res) => {
//     try {
//         const transacciones = await Transacciones.findAll({
//             include: {
//                 model: Cuentas,
//                 attributes: ['tipo']
//             }
//         });
//         res.json(transacciones);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const getTransaccion = async (req, res) => {
//     try {
//         const transaccion = await Transacciones.findOne({
//             where: { id: req.params.id },
//             include: {
//                 model: Cuentas,
//                 attributes: ['tipo']
//             }
//         });

//         if (!transaccion) return res.status(404).json({ message: 'Transacción no existe' });
//         res.json(transaccion);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const createTransaccion = async (req, res) => {
//     try {
//         const { cuenta_id, tipo, fecha, monto, descripcion } = req.body;

//         const nuevaTransaccion = await Transacciones.create({
//             cuenta_id,
//             tipo,
//             fecha,
//             monto,
//             descripcion
//         });
//         return res.status(201).json(nuevaTransaccion);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const updateTransaccion = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { tipo, fecha, monto, descripcion } = req.body;

//         const transaccion = await Transacciones.findOne({ where: { id } });

//         if (!transaccion) {
//             return res.status(404).json({ message: 'Transacción no encontrada' });
//         }

//         await transaccion.update({
//             tipo,
//             fecha,
//             monto,
//             descripcion
//         });

//         res.json(transaccion);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const deleteTransaccion = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deleted = await Transacciones.destroy({
//             where: { id },
//         });

//         if (!deleted) {
//             return res.status(404).json({ message: 'Transacción no encontrada' });
//         }

//         res.sendStatus(204);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };
