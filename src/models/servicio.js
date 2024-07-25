import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Servicio = sequelize.define(
  "Servicio",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      validate: {
        isInt: { msg: "" }
      }
    },
  },
  {
    timestamps: false,
  }
);
