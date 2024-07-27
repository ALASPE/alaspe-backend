import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Pagos_Mensuales = sequelize.define('Pagos_Mensuales', {
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
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: { msg: "Debe ser una fecha válida." },
      notNull: { msg: "La fecha no puede ser nula." }
    }
  },
  monto_seguro: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: { msg: "El monto del seguro debe ser un número decimal." },
      notNull: { msg: "El monto del seguro no puede ser nulo." }
    }
  },
  monto_prevision: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: { msg: "El monto de la previsión debe ser un número decimal." },
      notNull: { msg: "El monto de la previsión no puede ser nulo." }
    }
  }
}, {
  timestamps: false
});

export default Pagos_Mensuales;
