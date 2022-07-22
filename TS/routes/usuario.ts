import {Usuario} from '../controllers';
import {
    Router
} from 'express';

import {
    check
} from 'express-validator';

import { validarCampos } from '../middlewares';
const {
    obtenerUsuarios,
    crearUsuario,
    obtenerUsuario,
    actualizarUsuario,
    borrarUsuario,
    login,
    loggout
} = Usuario;




const router = Router()

router.get('/', obtenerUsuarios)

router.get(
    '/:id',
    check('id', 'El id no es válido').isMongoId(),
    validarCampos,
    obtenerUsuario)

router.post(
    '/',
    check('username', 'El nombre de usuario es requerido').notEmpty(),
    check('datos.nombre', 'El nombre es requerido').notEmpty().isAlpha(),
    check('datos.apellido', 'El apellido es requerido').notEmpty().isAlpha(),
    check('datos.cedula', 'La cédula es requerida').notEmpty().isNumeric().isLength({min: 10, max:10}),
    check('email', 'El correo no es válido').notEmpty().isEmail(),
    check('contrasena', 'La contraseña de usuario es requerida').notEmpty(), //.isStrongPassword() puede usarse para mejorar la seguridad de la contraseña
    validarCampos,
    crearUsuario)

router.post('/login', 
    check('username', 'El nombre de usuario es requerido').notEmpty(),
    check('contrasena', 'La contraseña de usuario es requerida').notEmpty(),
    validarCampos,
    login)

router.post('/loggout', loggout)

router.put(
    '/:id',
    check('id', 'El id no es válido').isMongoId(),
    validarCampos,
    actualizarUsuario)

router.delete(
    '/:id',
    check('id', 'El id no es válido').isMongoId(),
    validarCampos,
    borrarUsuario)

export {router as Usuario};