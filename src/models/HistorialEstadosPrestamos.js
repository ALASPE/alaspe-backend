import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const HistorialEstadosPrestamos = sequelize.define(
  "HistorialEstadosPrestamos",
  {
    historial_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoincrement: true,
    },

    fecha_cambio: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      validate: {
        isDate: { msg: "Debe ser una fecha válida." },
      },
    },

    estado_anterior: {
      type: DataTypes.ENUM("pendiente", "aprobado", "rechazado", "pagado"),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El estado no puede estar vacío." },
        notNull: { msg: "El estado no puede ser nulo." },
      },
    },

    estado_nuevo: {
      type: DataTypes.ENUM("pendiente", "aprobado", "rechazado", "pagado"),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El estado no puede estar vacío." },
        notNull: { msg: "El estado no puede ser nulo." },
      },
    },
  }
);
