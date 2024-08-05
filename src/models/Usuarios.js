import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Acciones } from "./Acciones.js";
import { HistorialEstadosPrestamos } from "./HistorialEstadosPrestamos.js";

export const Usuarios = sequelize.define(
  "Usuarios",
  {
    usuario_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      validate: {
        notNull: { msg: "El ID no puede ser nulo." },
      },
    },

    nombre: {
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

    password: {
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

    rol: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["administrador", "empleado"]],
          msg: "El estado debe ser 'administrador' o 'empleado'.",
        },
      },
    },
    createdAt:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  },
  {
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["usuario_id", "correo"],
      },
    ],
  }
);

Usuarios.hasMany(Acciones, {
  foreignKey: "usuario_id",
  sourceKey: "usuario_id",
});
Acciones.belongsTo(Usuarios, {
  foreignKey: "usuario_id",
  targetKey: "usuario_id",
});

Usuarios.hasMany(HistorialEstadosPrestamos, {
  foreignKey: "usuario_id",
  sourceKey: "usuario_id",
});
HistorialEstadosPrestamos.belongsTo(Usuarios, {
  foreignKey: "usuario_id",
  targetKey: "usuario_id",
});

