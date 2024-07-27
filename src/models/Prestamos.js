import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Prestamos = sequelize.define('Prestamos', {
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
  monto: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: { msg: "El monto debe ser un número decimal." },
      notNull: { msg: "El monto no puede ser nulo." }
    }
  },
  interes: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: { msg: "El interés debe ser un número decimal." },
      notNull: { msg: "El interés no puede ser nulo." }
    }
  },
  fecha_desembolso: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: { msg: "Debe ser una fecha válida." },
      notNull: { msg: "La fecha de desembolso no puede ser nula." }
    }
  },
  fecha_vencimiento: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: { msg: "Debe ser una fecha válida." },
      notNull: { msg: "La fecha de vencimiento no puede ser nula." }
    }
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "El estado no puede estar vacío." },
      notNull: { msg: "El estado no puede ser nulo." }
    }
  }
}, {
  timestamps: false
});

export default Prestamos;
