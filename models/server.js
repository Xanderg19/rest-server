const express = require('express')
const cors = require('cors');
const { dbconnection } = require('../database/config');
class Server{

    constructor(){
     
        this.app = express();
        this.port = process.env.PORT;

    
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth'

        //Conectar a base de datos
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbconnection()
    }


    middlewares(){

        //CORS
        this.app.use(cors() );
        //Lectura y parseo
        this.app.use(express.json() );
        //directorio publica
        this.app.use(express.static('public') );
    }

    routes() {
        this.app.use(this.authPath,require('../routes/auth'))
        this.app.use(this.usuariosPath,require('../routes/usuarios'))
    }

    listen(){
        this.app.listen((this.port),()=>{
            console.log(`La aplicacion se esta corriendo en el puerto ${this.port}`)
        })
    }

}
module.exports = Server;