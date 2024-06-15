import { DataTypes } from 'sequelize';

import db from '../db/connection';

const Usuario = db.define('usuario', {
    id: {
        type: DataTypes?.INTEGER,
        primaryKey: true,
        allowNull: true
    },
    fecha_ingreso: {
        type: DataTypes?.STRING,
        allowNull: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salario: {
        type: DataTypes?.FLOAT,
        allowNull: true,
        defaultValue: 0
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false

    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


export default Usuario;