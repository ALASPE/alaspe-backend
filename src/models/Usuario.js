import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Usuario = sequelize.define(
  "Usuario",
  {
    CIP: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      validate: {
        isInt: { msg: "El CIP debe ser un número entero." },
        notNull: { msg: "El CIP no puede ser nulo." },
        len: {
          args: [7, 7],
          msg: "El CIP debe tener 7 dígitos.",
        },
      },
    },
    DNI: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isInt: { msg: "El DNI debe ser un número entero." },
        notNull: { msg: "El DNI no puede ser nulo." },
        len: {
          args: [8, 8],
          msg: "El DNI debe tener 8 dígitos.",
        },
      },
    },
    Nombres: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "El nombre no puede ser nulo." },
        notEmpty: { msg: "El nombre no puede estar vacío." },
        len: {
          args: [1, 50],
          msg: "El nombre debe tener entre 1 y 50 caracteres.",
        },
      },
    },
    Apellidos: {
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
    Fecha_Nacimiento: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: { msg: "Debe ser una fecha válida." },
      },
    },
    Correo_1: {
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
    Correo_2: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: {
          msg: "Por favor, introduzca una dirección de correo válida.",
        },
      },
    },
    Telefono_1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: { msg: "El teléfono debe contener solo números." },
        notEmpty: { msg: "El teléfono no puede estar vacío." },
        notNull: { msg: "El teléfono no puede ser nulo." },
        len: {
          args: [9, 9],
          msg: "El teléfono debe tener 9 dígitos.",
        },
      },
    },
    Telefono_2: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isNumeric: { msg: "El teléfono debe contener solo números." },
        len: {
          args: [9, 9],
          msg: "El teléfono debe tener 9 dígitos.",
        },
      },
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La contraseña no puede estar vacía." },
        notNull: { msg: "La contraseña no puede ser nula." },
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          msg: "La contraseña debe contener al menos 8 caracteres, una letra en mayúscula, una en minúsculas, un número y un carácter especial.",
        },
      },
    },
    Rol: {
      type: DataTypes.ENUM("socio", "admin"),
      allowNull: false,
      defaultValue: "socio",
      validate: {
        isIn: {
          args: [["socio", "admin"]],
          msg: "El rol debe ser 'socio' o 'admin'.",
        },
      },
    },
    Estado: {
      type: DataTypes.ENUM("inactivo", "activo"),
      allowNull: false,
      defaultValue: "activo",
      validate: {
        isIn: {
          args: [["inactivo", "activo"]],
          msg: "El estado debe ser 'inactivo' o 'activo'.",
        },
      },
    },
  },
  {
    timestamps: false,
  }
);
