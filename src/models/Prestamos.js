import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Pagos } from "./Pagos.js";
import { HistorialEstadosPrestamos } from "./HistorialEstadosPrestamos.js";

export const Prestamos = sequelize.define(
  "Prestamos",
  {
    prestamos_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    monto_total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isFloat: { msg: "El monto debe ser un número decimal." },
        notNull: { msg: "El monto no puede ser nulo." },
      },
    },

    monto_pagado: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isFloat: { msg: "El monto debe ser un número decimal." },
        notNull: { msg: "El monto no puede ser nulo." },
      },
    },

    interes: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isFloat: { msg: "El interés debe ser un número decimal." },
        notNull: { msg: "El interés no puede ser nulo." },
      },
    },

    fecha_solicitud: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      validate: {
        isDate: { msg: "Debe ser una fecha válida." },
      },
    },

    fecha_desembolso: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: { msg: "Debe ser una fecha válida." },
        notNull: { msg: "La fecha de desembolso no puede ser nula." },
      },
    },

    fecha_vencimiento: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: { msg: "Debe ser una fecha válida." },
        notNull: { msg: "La fecha de vencimiento no puede ser nula." },
      },
    },

    estado: {
      type: DataTypes.ENUM("pendiente", "aprobado", "rechazado", "pagado"),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El estado no puede estar vacío." },
        notNull: { msg: "El estado no puede ser nulo." },
      },
    },
  },
  {
    timestamps: false,
  }
);

Prestamos.hasMany(Pagos, {
  foreignKey: "prestamos_id",
  sourceKey: "prestamos_id",
});
Pagos.belongsTo(Prestamos, {
  foreignKey: "prestamos_id",
  targetKey: "prestamos_id",
});

Prestamos.hasMany(HistorialEstadosPrestamos, {
  foreignKey: "prestamos_id",
  sourceKey: "prestamos_id",
});
HistorialEstadosPrestamos.belongsTo(Prestamos, {
  foreignKey: "prestamos_id",
  targetKey: "prestamos_id",
});

export default Prestamos;
