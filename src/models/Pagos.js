import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Pagos = sequelize.define(
  "Pagos",
  {
    pagos_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    fecha_pago: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: { msg: "Debe ser una fecha válida." },
        notNull: { msg: "La fecha no puede ser nula." },
      },
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        isFloat: { msg: "El monto debe ser un número decimal." },
        notNull: { msg: "El monto no puede ser nulo." },
      },
    },
  },
  {
    timestamps: false,
  }
);

export default Pagos;
