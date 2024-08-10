import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Beneficicarios = sequelize.define("Beneficiarios", {
  beneficiario_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      isInt: { msg: "El DNI debe ser un número entero." },
      notNull: { msg: "El DNI no puede ser nulo." },
      len: {
        args: [8, 8],
        msg: "El DNI debe tener 8 dígitos",
      },
    },
  },

  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "El nombre no puede ser nulo." },
      notEmpty: { msg: "El nombre no puedes estar vacío." },
      len: {
        args: [1, 50],
        msg: "El nombre debe tener entre 1 y 50 carácteres.",
      },
    },
  },

  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "El apellido no puede ser nulo." },
      notEmpty: { msg: "El apellido no puede estar vacío." },
      len: {
        args: [1, 50],
        msg: "El apellido debe tener entre 1 y 50 caracteres.",
      },
    },
  },

  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: {
        msg: "Debe ser una fecha válida.",
      },
    },
  },

  telefono_fjio: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: { msg: "El teléfono debe contener solo números." },
      notEmpty: { msg: "El teléfono no puede estar vacío." },
      notNull: { msg: "El teléfono no puede ser nulo." },
      len: {
        args: [1, 13],
        msg: "El teléfono debe tener 9 dígitos.",
      },
    },
  },

  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "El correo no puede estar vacío." },
      notNull: { msg: "El correo no puede ser nulo." },
      isEmail: {
        msg: "Por favor, introduzca una dirección de correo válida.",
      },
    },
  },

  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [["padre", "madre", "hijo", "hija"]],
        msg: "El estado debe ser 'padre', 'madre', 'hijo' o 'hija'.",
      },
    },
  },
});
