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
    },
    Descripcion: {
        type: DataTypes.ENUM("Caja de Pensiones Militar Policial", "Ejército del Perú", "Marina de guerra del Perú", "Fuerza Aérea del Perú", "Oficina Previsional de las Fuerzas Armadas"),
        allowNull: false,
        validate: {
            isIn: {
                args: [["Caja de Pensiones Militar Policial", "Ejército del Perú", "Marina de guerra del Perú", "Fuerza Aérea del Perú", "Oficina Previsional de las Fuerzas Armadas"]],
                msg: "El socio debe pertenecer a alguna institución armada."
            },
            notNull: { msg: "La institución debe tener una descipción" },
            notEmpty: { msg: "La institución debe tener una descipción" },
            len: {
                args: [1, 100],
                msg: "La descripción debe tener entre 1 y 100 caracteres."
            }
        }
    }
}, {
    timestamps: false,
})