import express, { Application } from 'express';
import cors from 'cors';

import db from '../db/connection';
import userRoutes from '../routes/usuario';
import solicitudesRoutes from '../routes/solicitud';


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuario: '/api/usuario',
        solicitud: '/solicitud'
    }

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || '8000';
        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {

        try {
            
            await db.authenticate();
            console.log('Database online');

        } catch (error) {
            throw new Error( 'error' );
        }

    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() );

        // Carpeta pública
        this.app.use( express.static('public') );
    }


    routes() {
        this.app.use( this.apiPaths.usuario, userRoutes )
        this.app.use( this.apiPaths.solicitud, solicitudesRoutes )
    }


    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port );
        })
    }

}

export default Server;