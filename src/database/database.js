import Sequilize from 'sequelize';

export const sequelize = new Sequilize('ALASPE','postgres','mz3842m5a7', {
    host: 'localhost',
    dialect: 'postgres',
});