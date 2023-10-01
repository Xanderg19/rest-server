const express = require('express')
const cors = require('cors');
class Server{

    constructor(){
     
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        //Middlewares
        this.middlewares();
        //rutas de mi aplicacion
        this.routes();
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
        this.app.use(this.usuariosPath,require('../routes/usuarios'))
    }

    listen(){
        this.app.listen((this.port),()=>{
            console.log(`La aplicacion se esta corriendo en el puerto ${this.port}`)
        })
    }

}
module.exports = Server;