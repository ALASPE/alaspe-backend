import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Pagos = sequelize.define('Pagos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  prestamo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Prestamos',
      key: 'id'
    }
  },
  tipo_pago: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "El tipo de pago no puede estar vacío." },
      notNull: { msg: "El tipo de pago no puede ser nulo." }
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
  }
}, {
  timestamps: false
});

export default Pagos;
