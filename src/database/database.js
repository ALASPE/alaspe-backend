import Sequilize from 'sequelize';

export const sequelize = new Sequilize('ALASPE','postgres','alaspe2024', {
    host: 'localhost',
    dialect: 'postgres',
});