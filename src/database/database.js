import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// export const sequelize = new Sequelize('ALASPE', 'wifiLaptop\wifituga', null,  {
//     host: 'localhost',
//     dialect: 'mysql',
// });


export const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require:  true,
                rejectAuthorized: false,
            }
        },
    }
);