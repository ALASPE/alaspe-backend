import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Socio = sequelize.define('Socio', {
  codigo_socio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  dni_socio: {
    type: DataTypes.INTEGER,
    uniqueValue:  true,
  },
  nombre_socio: {
    type: DataTypes.STRING,
  },
  apellido_socio: {
    type: DataTypes.STRING,
  },
  correo_socio: {
    type: DataTypes.STRING,
  },
  fecha_nac_socio: {
    type: DataTypes.DATE,
  },
  password_socio: {
    type: DataTypes.STRING,
  },
},{
  timestamps: false,
});