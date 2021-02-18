const cors = require('cors');
const express = require('express');
const { dbConnection } = require('../database/config');




class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariospath = '/api/usuarios';

        //conectar a base de datos
        this.conectarDB();
        //Middlewares 
        this.middlewares();
        //
        this.reoutes();
    }
    async conectarDB(){
        await dbConnection();
    }
    middlewares(){
        //cors
        this.app.use(cors());
        //butear y leer json
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'));
    }
    reoutes(){
        this.app.use(this.usuariospath, require('../routes/usuarios'));
    }
    listen(){
        this.app.listen(this.port, () =>{
            console.log('Corriendo en el puerto', this.port );
        });
    }
};


module.exports = Server;