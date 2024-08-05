
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Aportes = sequelize.define(
  "Aportes",
  {
    aportes_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    monto_aporte: {
      type: DataTypes.FLOAT,
      validate: {
        isDecimal: true,
      },
    },

    monto_prevision: {
      type: DataTypes.FLOAT,
      validate: {
        isDecimal: true,
      },
    },

    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: { msg: "Debe ser una fecha válida." },
        notNull: { msg: "La fecha de inicio no puede ser nula." },
      },
    },
  },
  {
    timestamps: false,
  }
);

export default Aportes;
