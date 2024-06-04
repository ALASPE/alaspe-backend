import express from 'express';
import socioRoutes from './routes/socio.routes.js';

const app = express();

// Middlewares
app.use(express.json()); // Servidor interpreta .json y guarda en req.body

// Rutas con prefijos
app.use(socioRoutes);

export default app;