"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Usuario = connection_1.default.define('usuario', {
    id: {
        type: sequelize_1.DataTypes === null || sequelize_1.DataTypes === void 0 ? void 0 : sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true
    },
    fecha_ingreso: {
        type: sequelize_1.DataTypes === null || sequelize_1.DataTypes === void 0 ? void 0 : sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    salario: {
        type: sequelize_1.DataTypes === null || sequelize_1.DataTypes === void 0 ? void 0 : sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    contrasena: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map