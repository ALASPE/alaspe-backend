import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Usuarios } from "./Usuarios.js";

export const Areas = sequelize.define(
  "Areas",
  {
    area_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_area: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre no puede estar vacío." },
        notNull: { msg: "El nombre no puede ser nulo." },
        len: {
          args: [1, 50],
          msg: "El nombre del área debe tener entre 1 y 50 caracteres.",
        },
      },
    },
  },
  {
    timestamps: false,
  }
);

Areas.hasMany(Usuarios, {
  foreignKey: "areas_id",
  sourceKey: "areas_id",
});
Usuarios.belongsTo(Areas, {
  foreignKey: "areas_id",
  targetKey: "areas_id",
});

export default Areas;
