import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import personaRoutes from './routes/persona.routes.js';
import cuentasRoutes from './routes/cuentas.routes.js';
import transaccionesRoutes from './routes/transacciones.routes.js';
import pagosMensualesRoutes from './routes/pagos_mensuales.routes.js';
import prestamosRoutes from './routes/prestamos.routes.js';
import pagosRoutes from './routes/pagos.routes.js';
import tiposDescuentosRoutes from './routes/tipos_descuentos.routes.js';
import aportesRoutes from './routes/aportes.routes.js';
import areasRoutes from './routes/areas.routes.js';
import auditoriaRoutes from './routes/auditoria.routes.js';
import authRoutes from './routes/auth.routes.js';
import dotenv from 'dotenv';
import './models/Persona.js';
import './models/Cuentas.js';
import './models/Transacciones.js';
import './models/Pagos_Mensuales.js';
import './models/Prestamos.js';
import './models/Pagos.js';
import './models/Tipos_Descuentos.js';
import './models/Aportes.js';
import './models/Areas.js';
import './models/Auditoria.js';
import './associations.js';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas con prefijos
app.use('/api', personaRoutes);
app.use('/api', cuentasRoutes);
app.use('/api', transaccionesRoutes);
app.use('/api', pagosMensualesRoutes);
app.use('/api', prestamosRoutes);
app.use('/api', pagosRoutes);
app.use('/api', tiposDescuentosRoutes);
app.use('/api', aportesRoutes);
app.use('/api', areasRoutes);
app.use('/api', auditoriaRoutes);

export default app;

//Capital, patrimonio, egreso e ingreso (( Activo prestamos (( Prevision social pasivo