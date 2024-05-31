const { config } = require('dotenv');
config()

module.exports = {
    db: {
        user: process.env.DB_USER,
        database:  process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
    }
}