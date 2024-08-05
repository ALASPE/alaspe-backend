import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Aportes } from "./Aportes.js";
import { Pagos } from "./Pagos.js";
import { Prestamos } from "./Prestamos.js";
import { Cuentas } from "./Cuentas.js";

export const Socios = sequelize.define(
  "Socios",
  {
    dni: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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

    cip: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: { msg: "El CIP debe ser un número entero." },
        len: {
          args: [7, 7],
          msg: "El CIP debe tener 7 dígitos.",
        },
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

    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "La dirección no puede ser nula." },
        notEmpty: { msg: "La dirección no puede estar vacia." },
        len: {
          args: [1, 200],
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

    fecha_ingreso: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          msg: "Debe ser una fecha válida.",
        },
      },
    },

    telefono: {
      type: DataTypes.INTEGER,
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

    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["activo", "inactivo"]],
          msg: "El estado debe ser 'activo' o 'inactivo'.",
        },
      },
    },
  },
  {
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["dni", "correo", "telefono"],
      },
    ],
  }
);

Socios.hasMany(Cuentas, {
  foreignKey: "socio_id",
  sourceKey: "dni",
});
Cuentas.belongsTo(Socios, {
  foreignKey: "socio_id",
  targetKey: "dni",
});

Socios.hasMany(Prestamos, {
  foreignKey: "socio_id",
  sourceKey: "dni",
});
Prestamos.belongsTo(Socios, {
  foreignKey: "socio_id",
  targetKey: "dni",
});

Socios.hasMany(Aportes, {
  foreignKey: "socio_id",
  sourceKey: "dni",
});
Aportes.belongsTo(Socios, {
  foreignKey: "socio_id",
  targetKey: "dni",
});

Socios.hasMany(Pagos, {
  foreignKey: "socio_id",
  sourceKey: "dni",
});
Pagos.belongsTo(Socios, {
  foreignKey: "socio_id",
  targetKey: "dni",
});
