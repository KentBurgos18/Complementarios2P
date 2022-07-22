export interface IUsuario {
    username: String;
    contrasena: String;
    datos: {
        nombre: String;
        apellido: String;
        cedula: String;
        nivel: Number;
        paralelo: String;
    }
    estado: Boolean;
    email: String;
    telefono: String;
}

