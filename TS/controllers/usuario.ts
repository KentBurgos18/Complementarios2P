import { Usuario } from '../models';
import { IUsuario } from '../interfaces';
import { Request, Response } from "express";

const obtenerUsuarios = async (req: Request, res: Response) => {
    const {
        limite = '10', desde = '0'
    } = req.query;
    const query = {
        estado: true
    };

    const [total, Usuarios]: [Number, IUsuario[]] =  await Promise.all([
        Usuario.countDocuments(),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite)),
    ])

    res.json({
        total,
        Usuarios
    })
}

const obtenerUsuario = async (req: Request, res: Response) => {
    const {
        id
    } = req.params;
    const usuario: IUsuario | null = await Usuario.findById(id);
    res.json(usuario);
}

const login = async(req: Request, res:Response) => {
    const {username, contrasena} = req.body as IUsuario;
    const user = await Usuario.findOne({username: username})
    if(user){
        if(contrasena === user.contrasena){
            return res.status(200).set('login', 'true').json(user);
        }
    }

    res.status(400).send({
        mesagge: "Credenciales incorrectas"
    })
}

const loggout = async(req:Request, res:Response) => {
    res.status(200).set('login', 'false');
}

const crearUsuario = async (req:Request, res:Response) => {
    const {
        estado,
        ...body
    } = req.body as IUsuario;

    const existeUsuario: IUsuario | null = await Usuario.findOne({$or: [
        {username: body.username},
        {email: body.email}
    ]});

    if (existeUsuario) {
        return res.status(400).send({
            message: `El Usuario con ese email ${body.email} o con este username ${body.username} ya se encuentra registrado`
        })
    }

    const usuario = new Usuario(body);
    const UsuarioNuevo = await usuario.save();
    return res.status(201).set('login', 'true').json(UsuarioNuevo);
}

const actualizarUsuario = async (req: Request, res: Response) => {
    const {
        id
    } = req.params;
    const {
        estado,
        ...body
    } = req.body as IUsuario;
    
    const UsuarioModificado: IUsuario | null = await Usuario.findByIdAndUpdate(id, body, {
        new: true
    })

    if(!UsuarioModificado) res.status(404).send({message: "Usuario no encontrado"})
    res.json(UsuarioModificado);
}

const borrarUsuario = async (req: Request, res: Response) => {
    const {
        id
    } = req.params;
    
    const UsuarioEliminado: IUsuario | null = await Usuario.findByIdAndUpdate(id, {
        estado: false
    }, {
        new: true
    })
    res.json(UsuarioEliminado);
}

export {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
    login,
    loggout
}