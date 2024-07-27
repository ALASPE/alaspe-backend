import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Tipos_Descuentos = sequelize.define('Tipos_Descuentos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "La descripción no puede estar vacía." },
      notNull: { msg: "La descripción no puede ser nula." }
    }
  }
}, {
  timestamps: false
});

export default Tipos_Descuentos;
