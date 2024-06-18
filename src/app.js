import express from 'express';
import cors from 'cors';
import usuarioRoutes from './routes/usuario.routes.js';
import servicioRoutes from './routes/servicios.routes.js'

const app = express();

// Middlewares
app.use(express.json()); // Servidor interpreta .json y guarda en req.body
app.use(cors());

// Rutas con prefijos
app.use(usuarioRoutes);
app.use(servicioRoutes);

export default app;