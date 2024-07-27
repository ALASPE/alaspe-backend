// Modelo Persona.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Persona = sequelize.define('Persona', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo: {
    type: DataTypes.ENUM('usuario', 'empleado'),
    allowNull: false,
    validate: {
      isIn: {
        args: [['usuario', 'empleado']],
        msg: "El tipo debe ser 'usuario' o 'empleado'."
      }
    }
  },
  CIP: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isInt: { msg: "El CIP debe ser un número entero." },
      len: {
        args: [6, 6],
        msg: "El CIP debe tener 7 dígitos."
      }
    }
  },
  DNI: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: "El DNI debe ser un número entero." },
      notNull: { msg: "El DNI no puede ser nulo." },
      len: {
        args: [7, 7],
        msg: "El DNI debe tener 8 dígitos."
      }
    }
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "El nombre no puede ser nulo." },
      notEmpty: { msg: "El nombre no puede estar vacío." },
      len: {
        args: [1, 50],
        msg: "El nombre debe tener entre 1 y 50 caracteres."
      }
    }
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "El apellido no puede ser nulo." },
      notEmpty: { msg: "El apellido no puede estar vacío." },
      len: {
        args: [1, 50],
        msg: "El apellido debe tener entre 1 y 50 caracteres."
      }
    }
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    validate: {
      isDate: { msg: "Debe ser una fecha válida." }
    }
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  telefono_1: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: { msg: "El teléfono debe contener solo números." },
      notEmpty: { msg: "El teléfono no puede estar vacío." },
      notNull: { msg: "El teléfono no puede ser nulo." },
      len: {
        args: [9, 9],
        msg: "El teléfono debe tener 9 dígitos."
      }
    }
  },
  telefono_2: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isNumeric: { msg: "El teléfono debe contener solo números." },
      len: {
        args: [9, 9],
        msg: "El teléfono debe tener 9 dígitos."
      }
    }
  },
  correo_1: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "El correo no puede estar vacío." },
      notNull: { msg: "El correo no puede ser nulo." },
      isEmail: { msg: "Por favor, introduzca una dirección de correo válida." }
    }
  },
  correo_2: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: { msg: "Por favor, introduzca una dirección de correo válida." }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "La contraseña no puede estar vacía." },
      notNull: { msg: "La contraseña no puede ser nula." },
      is: {
        args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        msg: 'La contraseña debe contener al menos 8 caracteres, una letra en mayúscula, una en minúsculas, un número y un carácter especial.'
      }
    }
  },
  rol: {
    type: DataTypes.ENUM("socio", "admin", "empleado"),
    allowNull: false,
    defaultValue: 'socio',
    validate: {
      isIn: {
        args: [["socio", "admin", "empleado"]],
        msg: "El rol debe ser 'socio', 'admin' o 'empleado'."
      }
    }
  },
  estado: {
    type: DataTypes.ENUM("inactivo", "activo"),
    allowNull: false,
    defaultValue: 'activo',
    validate: {
      isIn: {
        args: [["inactivo", "activo"]],
        msg: "El estado debe ser 'inactivo' o 'activo'."
      }
    }
  },
  area_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Areas',
      key: 'id'
    }
  },
  puesto: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['DNI', 'correo_1', 'correo_2', 'telefono_1', 'telefono_2']
    }
  ]
});

export default Persona;
