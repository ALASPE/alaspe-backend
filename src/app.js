import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../src/config/session.config.js';
import usuarioRoutes from './routes/usuario.routes.js';
import servicioRoutes from './routes/servicios.routes.js'

const app = express();

// Middlewares
app.use(express.json()); // Servidor interpreta .json y guarda en req.body
app.use(cors({
    origin: 'http://localhost:5173', // your frontend URL
    credentials: true
}));
app.use(cookieParser());

app.use((req, res, next) => {
    const token = req.cookies.access_token;
    req.session = { user: null };

    try {
        const data = jwt.verify(token, SECRET_KEY);
        req.session.user = data;
    } catch {}

    next();
});

// Rutas con prefijos
app.use(usuarioRoutes);
app.use(servicioRoutes);

export default app;