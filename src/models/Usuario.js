import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Usuario = sequelize.define('Usuario', {
  CIP: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    validate: {
      isInt: true,
      notNull: true,
      len: 7,
    }
  },
  DNI: {  
    type: DataTypes.INTEGER,
    uniqueValue: true,
    allowNull: false,
    validate: {
      isInt: true,
      notNull: true,
      len: 8,
    }
  },
  Nombres: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      len: [1, 50],
    }
  },
  Apellidos: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
      len: [1, 50],
    }
  },
  Fecha_Nacimiento: {
    type: DataTypes.DATE,
    defaultValue: sequelize.NOW,
    validate: {
      isDate: true,
    }
  },
  Correo_1: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "El correo no puede estar vacio."},
      notNull: { msg: "El correo no puede ser nulo."},
      isEmail: { msg: "Porfavor introduzca una dirección de correo valida."},
    }
  },
  Correo_2: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    }
  },
  Telefono_1: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: true,
      notEmpty: { msg: "La teléfono no puede estar vacio."},
      notNull: { msg: "La teléfono no puede ser nulo."},
      len: 9,
    }
  },
  Telefono_2: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isNumeric: true,
      len: 9,
    }
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      validatePassword: function(password) {
                    if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password))) {
                        throw new Error('La contraseña debe contener al menos 8 carácteres, una letra en mayúscula, una en minúsculas, y un número.');
                    }
                }
            },      
  },
  Rol: {
    type: DataTypes.ENUM("socio", "admin"),
    allowNull: false,
    defaultValue: 'socio',
  },
  Estado: {
    type:DataTypes.ENUM("inactivo", "activo"),
    allowNull: false,
    defaultValue: 'activo',
  }
},{
  timestamps: false,
});