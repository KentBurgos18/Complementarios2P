import mongoose from 'mongoose';
import { IUsuario } from '../interfaces';
const {
    Schema,
    model
} = mongoose;



const UsuarioSchema: mongoose.Schema  = new Schema <IUsuario>(
    {
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
    }
)

const Usuario = model<IUsuario>('Usuario', UsuarioSchema);
export {Usuario};