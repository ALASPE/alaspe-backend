import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Tramites = sequelize.define("Tramites", {
  tramite_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      isInt: { msg: "El código de trámite debe ser entero." },
      notNull: { msg: "El código de trámite no debe ser nulo." },
      len: {
        args: [4, 4],
        msg: "El código de trámite debe tener 4 dígitos",
      },
    },
  },
});
