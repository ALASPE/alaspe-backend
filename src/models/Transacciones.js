import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Transacciones = sequelize.define('Transacciones', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cuenta_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Cuentas',
      key: 'id'
    }
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "El tipo no puede estar vacío." },
      notNull: { msg: "El tipo no puede ser nulo." }
    }
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: { msg: "Debe ser una fecha válida." },
      notNull: { msg: "La fecha no puede ser nula." }
    }
  },
  monto: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: { msg: "El monto debe ser un número decimal." },
      notNull: { msg: "El monto no puede ser nulo." }
    }
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: false
});

export default Transacciones;
