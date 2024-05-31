import Sequilize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config()

export const sequelize = new Sequilize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
});