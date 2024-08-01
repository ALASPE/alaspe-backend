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
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 20.0,
      validate: {
        isDecimal: true,
      },
    },

    monto_prevision: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 15.0,
      validate: {
        isDecimal: true,
      },
    },

    fecha: {
      type: DataTypes.DATE,
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
