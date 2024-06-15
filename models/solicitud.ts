import { DataTypes } from 'sequelize';

import db from '../db/connection';
import Usuario from './usuario';

const Solicitud = db.define('solicitud', {
    id: {
        type: DataTypes?.INTEGER,
        primaryKey: true,
        allowNull: true
    },
    codigo: {
        type: DataTypes?.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    resumen: {
        type: DataTypes?.STRING,
        allowNull: false
    },
    id_empleado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deletedAt: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'solicitud'
});

Solicitud.belongsTo(Usuario, { foreignKey: 'id_empleado' });

export default Solicitud;