import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Cuentas = sequelize.define('Cuentas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  socio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuario',
      key: 'CIP'
    }
  },
  saldo: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: { msg: "El saldo debe ser un número decimal." },
      notNull: { msg: "El saldo no puede ser nulo." }
    }
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "El tipo no puede estar vacío." },
      notNull: { msg: "El tipo no puede ser nulo." }
    }
  }
}, {
  timestamps: false
});

export default Cuentas;
