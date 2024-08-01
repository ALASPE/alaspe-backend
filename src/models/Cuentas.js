import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Cuentas = sequelize.define('Cuentas', {
  cuenta_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  saldo_aporte: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0,
    allowNull: false,
    validate: {
      isDecimal: true,
    }
  },

  saldo_prevision: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0,
    allowNull: false,
    validate: {
      isDecimal: true,
    }
  },

}, {
  timestamps: false
});

export default Cuentas;
