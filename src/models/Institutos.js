import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Socios } from "./Socios.js";

export const Institutos = sequelize.define(
  "Institutos",
  {
    institutos_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      validate: {
        isIn: {
          args: [
            [
              "CPMP-FAP",
              "CPMP-EP",
              "CPMP-AP",
              "EP",
              "AP",
              "FAP",
              "OPREFA-FAP",
              "OPREFA-EP",
              "OPREFA-AP",
              "CC",
              "MD",
            ],
          ],
          msg: "El socio debe pertenecer a alguna institución armada.",
        },
      },
    },
    Descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [
            [
              "Caja de Pensiones Militar Policial FAP",
              "Caja de Pensiones Militar Policial Ejercito",
              "Caja de Pensiones Militar Policial Marina",
              "Ejército del Perú",
              "Marina de guerra del Perú",
              "Fuerza Aérea del Perú",
              "Oficina Previsional de las Fuerzas Armadas FAP",
              "Oficina Previsional de las Fuerzas Armadas Ejercito",
              "Oficina Previsional de las Fuerzas Armadas Marina",
              "Comando Conjunto",
              "Ministerio Defensa",
            ],
          ],
          msg: "El socio debe pertenecer a alguna institución armada.",
        },
        notNull: { msg: "La institución debe tener una descipción" },
        notEmpty: { msg: "La institución debe tener una descipción" },
        len: {
          args: [1, 100],
          msg: "La descripción debe tener entre 1 y 100 caracteres.",
        },
      },
    },
  },
  {
    timestamps: false,
  }
);

Institutos.hasMany(Socios, {
  foreignKey: "institutos_id",
  sourceKey: "institutos_id",
});
Socios.belongsTo(Institutos, {
  foreignKey: "institutos_id",
});
