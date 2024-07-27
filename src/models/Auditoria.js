import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Auditoria = sequelize.define('Auditoria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  empleado_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Empleados',
      key: 'id'
    }
  },
  accion: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "La acción no puede estar vacía." },
      notNull: { msg: "La acción no puede ser nula." }
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
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: false
});

export default Auditoria;
