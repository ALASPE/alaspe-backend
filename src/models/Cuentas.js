import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Cuentas = sequelize.define('Cuentas', {
  cuenta_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  saldo_aporte: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isDecimal: true,
    }
  },

  saldo_prevision: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isDecimal: true,
    }
  },

}, {
  timestamps: false
});

export default Cuentas;
