import { sequelize } from './database/database.js';
import { Persona } from './models/Persona.js';
import app from './app.js';

const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Synchronize models
        await Persona.sync({ force: true }); // or use { force: true } if you want to drop and recreate the table

        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

main();
