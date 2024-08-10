import { Prestamos } from "../models/Prestamos.js";
import { Pagos } from "../models/Pagos.js";
import { HistorialEstadosPrestamos } from "../models/HistorialEstadosPrestamos.js";
import { Socios } from "../models/Socios.js";
import { Usuarios } from "../models/Usuarios.js";
import { Institutos } from "../models/Institutos.js";


export const getTotalPrestamosPorInstituto = async (req, res) => {
  try {
      const prestamosPorInstituto = await Institutos.findAll({
          include: [
              {
                  model: Socios,
                  attributes: [],
                  include: [
                      {
                          model: Prestamos,
                          attributes: [],
                          where: { estado: 'aprobado' },
                      },
                  ],
              },
          ],
          attributes: [
              'institutos_id',
              [sequelize.fn('SUM', sequelize.col('Socios.Prestamos.monto_total')), 'total_monto'],
          ],
          group: ['Institutos.institutos_id'],
      });

      res.json(prestamosPorInstituto);
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};

export const sumMontoTotalAprobados = async (req, res) => {
  try {
    const totalMonto = await Prestamos.sum('monto_total', {
      where: { estado: 'aprobado' },
    });

    res.json({ totalMonto });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const countPrestamosByEstado = async (req, res) => {
  try {
    const estados = ['pendiente', 'aprobado', 'rechazado', 'pagado'];
    const conteos = {};

    for (const estado of estados) {
      conteos[estado] = await Prestamos.count({
        where: { estado },
      });
    }

    res.json(conteos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const countAllPrestamos = async (req, res) => {
  try {
    const totalPrestamos = await Prestamos.count();
    res.json({ total: totalPrestamos });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPrestamos = async (req, res) => {
    try {
      const prestamos = await Prestamos.findAll({
        include: [
          {
            model: Pagos,
            attributes: ["pago_id", "monto", "fecha_pago"],
          },
          {
            model: HistorialEstadosPrestamos,
            attributes: ["historial_id", "fecha_cambio", "estado_anterior", "estado_nuevo"],
          },
          {
            model: Socios,
            attributes: ["dni", "nombre", "apellido"],
          },
        ],
      });
      res.json(prestamos);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const getPrestamoById = async (req, res) => {
    try {
      const prestamo = await Prestamos.findOne({
        where: { prestamos_id: req.params.id },
        include: [
          {
            model: Pagos,
            attributes: ["pago_id", "monto", "fecha_pago"],
          },
          {
            model: HistorialEstadosPrestamos,
            attributes: ["historial_id", "fecha_cambio", "estado_anterior", "estado_nuevo"],
          },
          {
            model: Socios,
            attributes: ["dni", "nombre", "apellido"],
          },
        ],
      });
  
      if (!prestamo) return res.status(404).json({ message: "Préstamo no encontrado" });
  
      res.json(prestamo);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const createPrestamo = async (req, res) => {
    try {
      const { socio_id, monto_total, monto_pagado, interes, fecha_desembolso, fecha_vencimiento, estado, usuario_id } = req.body;

      const socio = await Socios.findOne({ where: { socio_id } });
      if (!socio) {
        return res.status(404).json({ message: "Socio no encontrado" });
      }

      const usuario = await Usuarios.findOne({ where: { usuario_id } });
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      const newPrestamo = await Prestamos.create({
        socio_id,
        monto_total,
        monto_pagado,
        interes,
        fecha_solicitud: new Date(),
        fecha_desembolso,
        fecha_vencimiento,
        estado,
      });

      await HistorialEstadosPrestamos.create({
        prestamo_id: newPrestamo.prestamos_id,
        usuario_id,
        fecha_cambio: new Date(),
        estado_anterior: null,
        estado_nuevo: estado,
      });
  
      return res.status(201).json(newPrestamo);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res
          .status(400)
          .json({ message: "Error de validación", errors: error.errors });
      }
      return res.status(500).json({ message: error.message });
    }
  };

  export const updatePrestamo = async (req, res) => {
    try {
      const { prestamo_id } = req.params;
      const { usuario_id } = req.session;
      const { monto_total, monto_pagado, interes, fecha_desembolso, fecha_vencimiento, estado } = req.body;
  
      const prestamo = await Prestamos.findOne({ where: { prestamos_id: prestamo_id } });
  
      if (!prestamo) {
        return res.status(404).json({ message: "Préstamo no encontrado" });
      }
  
      await prestamo.update({
        monto_total,
        monto_pagado,
        interes,
        fecha_desembolso,
        fecha_vencimiento,
        estado,
      });
  
      await HistorialEstadosPrestamos.create({
        prestamo_id: prestamo.prestamos_id,
        usuario_id,
        fecha_cambio: new Date(),
        estado_anterior: prestamo.estado,
        estado_nuevo: estado,
      });

      await registrarAccion(usuario_id, 'Modificar préstamo', `Creó un tipo de pago con ID ${prestamo.prestamos_id}`);
  
      res.json(prestamo);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res
          .status(400)
          .json({ message: "Error de validación", errors: error.errors });
      }
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const deletePrestamo = async (req, res) => {
    try {
      const { prestamo_id } = req.params;
      const { usuario_id } = req.session;
  
      const deletedPrestamo = await Prestamos.destroy({
        where: { prestamos_id: prestamo_id },
      });

      await registrarAccion(usuario_id, 'Eliminar préstamo', `Creó un tipo de pago con ID ${prestamo.prestamos_id}`);
  
      if (!deletedPrestamo) {
        return res.status(404).json({ message: "Préstamo no encontrado" });
      }
  
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  