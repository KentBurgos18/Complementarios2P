"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggout = exports.login = exports.borrarUsuario = exports.actualizarUsuario = exports.crearUsuario = exports.obtenerUsuario = exports.obtenerUsuarios = void 0;
const models_1 = require("../models");
const obtenerUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = '10', desde = '0' } = req.query;
    const query = {
        estado: true
    };
    const [total, Usuarios] = yield Promise.all([
        models_1.Usuario.countDocuments(),
        models_1.Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);
    res.json({
        total,
        Usuarios
    });
});
exports.obtenerUsuarios = obtenerUsuarios;
const obtenerUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield models_1.Usuario.findById(id);
    res.json(usuario);
});
exports.obtenerUsuario = obtenerUsuario;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, contrasena } = req.body;
    const user = yield models_1.Usuario.findOne({ username: username });
    if (user) {
        if (contrasena === user.contrasena) {
            return res.status(200).set('login', 'true').json(user);
        }
    }
    res.status(400).send({
        mesagge: "Credenciales incorrectas"
    });
});
exports.login = login;
const loggout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).set('login', 'false');
});
exports.loggout = loggout;
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { estado } = _a, body = __rest(_a, ["estado"]);
    const existeUsuario = yield models_1.Usuario.findOne({ $or: [
            { username: body.username },
            { email: body.email }
        ] });
    if (existeUsuario) {
        return res.status(400).send({
            message: `El Usuario con ese email ${body.email} o con este username ${body.username} ya se encuentra registrado`
        });
    }
    const usuario = new models_1.Usuario(body);
    const UsuarioNuevo = yield usuario.save();
    return res.status(201).set('login', 'true').json(UsuarioNuevo);
});
exports.crearUsuario = crearUsuario;
const actualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { estado } = _b, body = __rest(_b, ["estado"]);
    const UsuarioModificado = yield models_1.Usuario.findByIdAndUpdate(id, body, {
        new: true
    });
    if (!UsuarioModificado)
        res.status(404).send({ message: "Usuario no encontrado" });
    res.json(UsuarioModificado);
});
exports.actualizarUsuario = actualizarUsuario;
const borrarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const UsuarioEliminado = yield models_1.Usuario.findByIdAndUpdate(id, {
        estado: false
    }, {
        new: true
    });
    res.json(UsuarioEliminado);
});
exports.borrarUsuario = borrarUsuario;
