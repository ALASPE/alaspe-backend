// import { Cuentas } from '../models/Cuentas.js';
// import { Persona } from '../models/Persona.js';

// export const getCuentas = async (req, res) => {
//     try {
//         const cuentas = await Cuentas.findAll({
//             include: {
//                 model: Persona,
//                 attributes: ['nombres', 'apellidos']
//             }
//         });
//         res.json(cuentas);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const getCuenta = async (req, res) => {
//     try {
//         const cuenta = await Cuentas.findOne({
//             where: { id: req.params.id },
//             include: {
//                 model: Persona,
//                 attributes: ['nombres', 'apellidos']
//             }
//         });

//         if (!cuenta) return res.status(404).json({ message: 'Cuenta no existe' });
//         res.json(cuenta);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const createCuenta = async (req, res) => {
//     try {
//         const { socio_id, saldo, tipo } = req.body;

//         const nuevaCuenta = await Cuentas.create({
//             socio_id,
//             saldo,
//             tipo
//         });
//         return res.status(201).json(nuevaCuenta);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const updateCuenta = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { saldo, tipo } = req.body;

//         const cuenta = await Cuentas.findOne({ where: { id } });

//         if (!cuenta) {
//             return res.status(404).json({ message: 'Cuenta no encontrada' });
//         }

//         await cuenta.update({
//             saldo,
//             tipo
//         });

//         res.json(cuenta);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

// export const deleteCuenta = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deleted = await Cuentas.destroy({
//             where: { id },
//         });

//         if (!deleted) {
//             return res.status(404).json({ message: 'Cuenta no encontrada' });
//         }

//         res.sendStatus(204);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };
