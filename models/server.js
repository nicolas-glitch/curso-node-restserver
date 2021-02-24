const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload')
const { dbConnection } = require('../database/config');




class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths ={
            auth : '/api/auth',
            buscar : '/api/buscar',
            productos: '/api/productos',
            categorias: '/api/categorias',
            usuarios : '/api/usuarios',
            uploads: '/api/uploads'
        }
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
        // cargar archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true

        }));
        //directorio publico
        this.app.use(express.static('public'));
    }
    reoutes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }
    listen(){
        this.app.listen(this.port, () =>{
            console.log('Corriendo en el puerto', this.port );
        });
    }
};


module.exports = Server;


