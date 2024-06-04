import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Servicio = sequelize.define('Servicio', {
    codigo_servicio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_servicio: {
        type: DataTypes.STRING,
    },
    descripcion_servicio: {
        type: DataTypes.STRING,
    }
},{
    timestamps: false,
})
