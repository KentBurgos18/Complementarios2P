"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const controllers_1 = require("../controllers");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const { obtenerUsuarios, crearUsuario, obtenerUsuario, actualizarUsuario, borrarUsuario, login, loggout } = controllers_1.Usuario;
const router = (0, express_1.Router)();
exports.Usuario = router;
router.get('/', obtenerUsuarios);
router.get('/:id', (0, express_validator_1.check)('id', 'El id no es válido').isMongoId(), middlewares_1.validarCampos, obtenerUsuario);
router.post('/', (0, express_validator_1.check)('username', 'El nombre de usuario es requerido').notEmpty(), (0, express_validator_1.check)('datos.nombre', 'El nombre es requerido').notEmpty().isAlpha(), (0, express_validator_1.check)('datos.apellido', 'El apellido es requerido').notEmpty().isAlpha(), (0, express_validator_1.check)('datos.cedula', 'La cédula es requerida').notEmpty().isNumeric().isLength({ min: 10, max: 10 }), (0, express_validator_1.check)('email', 'El correo no es válido').notEmpty().isEmail(), (0, express_validator_1.check)('contrasena', 'La contraseña de usuario es requerida').notEmpty(), //.isStrongPassword() puede usarse para mejorar la seguridad de la contraseña
middlewares_1.validarCampos, crearUsuario);
router.post('/login', (0, express_validator_1.check)('username', 'El nombre de usuario es requerido').notEmpty(), (0, express_validator_1.check)('contrasena', 'La contraseña de usuario es requerida').notEmpty(), middlewares_1.validarCampos, login);
router.post('/loggout', loggout);
router.put('/:id', (0, express_validator_1.check)('id', 'El id no es válido').isMongoId(), middlewares_1.validarCampos, actualizarUsuario);
router.delete('/:id', (0, express_validator_1.check)('id', 'El id no es válido').isMongoId(), middlewares_1.validarCampos, borrarUsuario);
