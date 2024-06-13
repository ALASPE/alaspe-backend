import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Socio = sequelize.define('Socio', {
  CIP: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  DNI: {
    type: DataTypes.INTEGER,
    uniqueValue: true,
  },
  Nombres: {
    type: DataTypes.STRING,
  },
  Apellidos: {
    type: DataTypes.STRING,
  },
  Fecha_Nacimiento: {
    type: DataTypes.STRING,
  },
  Correo_1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Correo_2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Telefono_1: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Telefono_2: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  password_socio: {
    type: DataTypes.STRING,
  },
},{
  timestamps: false,
});