const cors = require('cors');
const express = require('express');




class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariospath = '/api/usuarios';
        //Middlewares 
        this.middlewares();
        //
        this.reoutes();
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