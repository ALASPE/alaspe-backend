import express from 'express';
import cors from 'cors';
import socioRoutes from './routes/socios.routes.js';
import servicioRoutes from './routes/servicios.routes.js'

const app = express();

// Middlewares
app.use(express.json()); // Servidor interpreta .json y guarda en req.body
app.use(cors());

// Rutas con prefijos
app.use(socioRoutes);
app.use(servicioRoutes);

export default app;