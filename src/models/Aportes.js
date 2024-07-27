import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Aportes = sequelize.define('Aportes', {
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
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "El tipo no puede estar vacío." },
      notNull: { msg: "El tipo no puede ser nulo." }
    }
  },
  monto_cobertura: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: { msg: "El monto de la cobertura debe ser un número decimal." },
      notNull: { msg: "El monto de la cobertura no puede ser nulo." }
    }
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: { msg: "Debe ser una fecha válida." },
      notNull: { msg: "La fecha de inicio no puede ser nula." }
    }
  },
  fecha_vencimiento: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: { msg: "Debe ser una fecha válida." },
      notNull: { msg: "La fecha de vencimiento no puede ser nula." }
    }
  }
}, {
  timestamps: false
});

export default Aportes;
