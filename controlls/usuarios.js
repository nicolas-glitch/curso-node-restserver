const {response, request} = require('express');
const becryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { all } = require('../routes/usuarios');

//mostrar usuarios
const usuariosGet = async(req= request, res = response) => {
               const {limite, desde} = req.query; 
               const query = {estado:true}; 
               const [usuarios,total] = await Promise.all([
                                Usuario.find(query),
                                Usuario.countDocuments(query)
                                .skip(Number(desde)) 
                                .limit(Number(limite))
            ]);                 
               res.json({total,usuarios});
};
//mostrar usuario
const usuarioGet = async(req= request, res = response) => {

};

// agregar usuario
const usuariosPost = async (req, res) => {

        const {nombre, correo, contraseña,rol} = req.body;  
        const usuario = new Usuario({nombre,correo,contraseña,rol}); 

        //Encriptar la contraseña
        const salt = becryptjs.genSaltSync();
        usuario.contraseña = becryptjs.hashSync(contraseña,salt);

        //guardar db
        await usuario.save();
        res.json({usuario});
    };

    //actualizar usuario
const usuariosPut =  async(req, res) => {
    
        const {id} = req.params;
        const {_id,contraseña,google,estado,...resto} = req.body
        // //verificar contraseña
        // const usuario = Usuario.findById(id);
        // console.log(usuario);
        //validar contra base de datos
        if(contraseña){
            const salt = becryptjs.genSaltSync();
            resto.contraseña = becryptjs.hashSync(contraseña,salt);
            
        }
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id,resto);

        res.json({usuarioActualizado});
    };

const usuariosPatch = (req, res) => {
        res.status(401).json({
            informacion: 'Api desde patch-controlls'
        });
    };


const usuariosDelete =  async(req, res) => {
        const {id} = req.params;
        
        const usuarioBorrado = await Usuario.findByIdAndUpdate(id, {estado :false});

        res.json(usuarioBorrado);
    };


module.exports = {
    usuariosGet,
    usuarioGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}