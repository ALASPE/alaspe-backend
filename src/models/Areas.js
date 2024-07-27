import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Areas = sequelize.define('Areas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "El nombre no puede estar vacío." },
      notNull: { msg: "El nombre no puede ser nulo." }
    }
  }
}, {
  timestamps: false
});

export default Areas;
