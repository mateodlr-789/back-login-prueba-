"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../controllers/usuario");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = express_1.Router();
router.get('/', [validar_jwt_1.validarJWT], usuario_1.getUsuarios);
router.get('/:id', [validar_jwt_1.validarJWT], usuario_1.getUsuario);
router.post('/', usuario_1.createUsuario);
router.post('/login', usuario_1.loginUsuario);
exports.default = router;
//# sourceMappingURL=usuario.js.map