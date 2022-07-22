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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./database/config");
const routes_1 = require("./routes");
class Server {
    constructor() {
        this.app = express_1.default.Router();
        this.router = express_1.default.Router();
        this.port = Number(process.env["PORT"]);
        this.paths = {
            usuario: '/usuario',
            aulas: '/aulas',
            asignaturas: '/asignaturas',
            horario: '/horario',
            docentes: '/docentes'
        };
        this.conectarDB();
        this.middlewares();
        this.routes();
        this.router.use('/horarios', this.app);
        this._express = (0, express_1.default)().use(this.router);
    }
    conectarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.dbConnection)();
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.paths.usuario, routes_1.Usuario);
        // this.app.use(this.paths.aulas, aulas)
        // this.app.use(this.paths.asignaturas, asignaturas)
        // this.app.use(this.paths.docentes, docentes)
        // this.app.use(this.paths.horario, horario)
    }
    listen() {
        this._express.listen(this.port, () => console.log(`Servidor corriendo en el puerto ${this.port}/horarios`));
    }
}
exports.Server = Server;
