import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Aportes } from "./Aportes.js";
import { Pagos } from "./Pagos.js";

export const TiposPagos = sequelize.define("TiposPagos", {
  tipo_pago_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      isInt: { msg: "El código de tipo de pago deber ser entero." },
      notNull: { msg: "El código de tipo de pago no debe ser nulo." },
      len: {
        args: [3, 3],
        msg: "El código de tipo de pago debe tener 3 dígitos.",
      },
    },
  },

  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "El descripción no puede ser nulo." },
      notEmpty: { msg: "El descripción no puede estar vacío." },
      len: {
        args: [1, 50],
        msg: "El descripción debe tener entre 1 y 50 caracteres.",
      },
    },
  },
});

TiposPagos.hasMany(Aportes, {
  foreignKey: "Socio",
  sourceKey: "dni",
});
Aportes.belongsTo(TiposPagos, {
  foreignKey: "Socio",
  targetKey: "dni",
});

TiposPagos.hasMany(Pagos, {
  foreignKey: "Socio",
  sourceKey: "dni",
});
Pagos.belongsTo(TiposPagos, {
  foreignKey: "Socio",
  targetKey: "dni",
});
