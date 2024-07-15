import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Usuario = sequelize.define('Usuario', {
  CIP: {
    type: DataTypes.INTEGER[7],
    primaryKey: true,
  },
  DNI: {
    type: DataTypes.INTEGER(8),
    uniqueValue: true,
  },
  Nombres: {
    type: DataTypes.STRING,
  },
  Apellidos: {
    type: DataTypes.STRING,
  },
  Fecha_Nacimiento: {
    type: DataTypes.DATEONLY,
  },
  Correo_1: {
    type: DataTypes.EMAIL,
    allowNull: false
  },
  Correo_2: {
    type: DataTypes.EMAIL,
    allowNull: true,
  },
  Telefono_1: {
    type: DataTypes.INTEGER(9),
    allowNull: false,
  },
  Telefono_2: {
    type: DataTypes.INTEGER(9),
    allowNull: true,
  },
  Password: {
    type: DataTypes.STRING,
  },
  Rol: {
    type: DataTypes.ENUM("socio", "admin"),
    allowNull: false,
    defaultValue: 'socio',
  },
  Estado: {
    type:DataTypes.ENUM("inactivo", "activo"),
    allowNull: false,
    defaultValue: 'activo',
  }
},{
  timestamps: false,
});