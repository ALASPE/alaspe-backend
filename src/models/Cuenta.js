import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const Cuenta = sequelize.define('Cuenta', {
    ID_Cuenta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    Ultimo_Movimiento: {
        type: DataTypes.DATE,
    },
})