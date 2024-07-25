import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Institucion = sequelize.define('Instituto', {
    id: {
        type: DataTypes.ENUM("CPMP", "EP", "AP", "FAP", "OPREFA"),
        allowNull: false,
        validate: {
            isIn: {
                args: [["CPMP", "EP", "AP", "FAP", "OPREFA"]],
                msg: "El socio debe pertenecer a alguna institución armada."
            }
        }
    }
}, {
    timestamps: false,
})