import Persona from './models/Persona.js';
import Cuentas from './models/Cuentas.js';
import Transacciones from './models/Transacciones.js';
import Pagos_Mensuales from './models/Pagos_Mensuales.js';
import Prestamos from './models/Prestamos.js';
import Pagos from './models/Pagos.js';
import Tipos_Descuentos from './models/Tipos_Descuentos.js';
import Aportes from './models/Aportes.js';
import Areas from './models/Areas.js';
import Auditoria from './models/Auditoria.js';

// Associations
Persona.hasMany(Cuentas, { foreignKey: 'socio_id' });
Cuentas.belongsTo(Persona, { foreignKey: 'socio_id' });

Cuentas.hasMany(Transacciones, { foreignKey: 'cuenta_id' });
Transacciones.belongsTo(Cuentas, { foreignKey: 'cuenta_id' });

Cuentas.hasMany(Pagos_Mensuales, { foreignKey: 'cuenta_id' });
Pagos_Mensuales.belongsTo(Cuentas, { foreignKey: 'cuenta_id' });

Persona.hasMany(Prestamos, { foreignKey: 'socio_id' });
Prestamos.belongsTo(Persona, { foreignKey: 'socio_id' });

Prestamos.hasMany(Pagos, { foreignKey: 'prestamo_id' });
Pagos.belongsTo(Prestamos, { foreignKey: 'prestamo_id' });

Persona.hasMany(Aportes, { foreignKey: 'socio_id' });
Aportes.belongsTo(Persona, { foreignKey: 'socio_id' });

Areas.hasMany(Persona, { foreignKey: 'area_id' });
Persona.belongsTo(Areas, { foreignKey: 'area_id' });

Persona.hasMany(Auditoria, { foreignKey: 'empleado_id' });
Auditoria.belongsTo(Persona, { foreignKey: 'empleado_id' });
