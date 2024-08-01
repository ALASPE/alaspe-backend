import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Acciones = sequelize.define(
  "Acciones",
  {
    accion_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    accion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La acción no puede estar vacía." },
        notNull: { msg: "La acción no puede ser nula." },
      },
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      validate: {
        isDate: { msg: "Debe ser una fecha válida." },
        notNull: { msg: "La fecha no puede ser nula." },
      },
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

export default Acciones;
