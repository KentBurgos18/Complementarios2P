"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const UsuarioSchema = new Schema({
    username: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio']
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña de usuario es obligatoria']
    },
    datos: {
        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio']
        },
        apellido: {
            type: String,
            required: [true, 'El apellido es obligatorio']
        },
        cedula: {
            type: String,
            required: [true, 'La cédula es obligatoria']
        },
        nivel: Number,
        paralelo: String
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    telefono: String
});
const Usuario = model('Usuario', UsuarioSchema);
exports.Usuario = Usuario;
