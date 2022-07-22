import express from 'express';
import cors from 'cors';
import {dbConnection} from './database/config';

import {Usuario} from './routes';

class Server {
    app: express.Router;
    router: express.Router;
    port:  Number ;
    paths: { [key: string]: string };
    private _express: express.Express;
    constructor() {
        this.app = express.Router();
        this.router = express.Router();
        this.port = Number(process.env["PORT"]);
        this.paths = {
            usuario: '/usuario'
        }
        this.conectarDB();
        this.middlewares();
        this.routes();
        this.router.use('/horarios', this.app);
        this._express = express().use(this.router);
    }
    private async conectarDB() {
        await dbConnection();
    }
    private middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }
    private routes() {
        this.app.use(this.paths.usuario, Usuario)
    }
    listen() {
        this._express.listen(this.port, () =>  console.log(`Servidor corriendo en el puerto ${this.port}/horarios`))
    }
}

export {Server}