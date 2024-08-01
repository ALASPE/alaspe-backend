import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import accionesRoutes from './routes/acciones.routes.js';
import aportesRoutes from './routes/aportes.routes.js';
import areasRoutes from './routes/areas.routes.js';
import authRoutes from './routes/auth.routes.js';
import cuentasRoutes from './routes/cuentas.routes.js';
import historialestadosprestamosRoutes from './routes/historialestadosprestamos.routes.js';
import institutosRoutes from './routes/institutos.routes.js';
import pagosRoutes from './routes/pagos.routes.js';
import prestamosRoutes from './routes/prestamos.routes.js';
import sociosRoutes from './routes/socios.routes.js';
import tipospagosRoutes from './routes/tipospagos.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.use('/api', accionesRoutes);
app.use('/api', aportesRoutes);
app.use('/api', areasRoutes);
app.use('/api', cuentasRoutes);
app.use('/api', historialestadosprestamosRoutes);
app.use('/api', institutosRoutes);
app.use('/api', pagosRoutes);
app.use('/api', prestamosRoutes);
app.use('/api', sociosRoutes);
app.use('/api', tipospagosRoutes);
app.use('/api', usuariosRoutes);

export default app;

//Capital, patrimonio, egreso e ingreso (( Activo prestamos (( Prevision social pasivo