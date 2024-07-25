import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import usuarioRoutes from './routes/usuario.routes.js';
import servicioRoutes from './routes/servicios.routes.js';
import authRoutes from './routes/auth.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas con prefijos
app.use('/api', usuarioRoutes);
app.use('/api', servicioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
