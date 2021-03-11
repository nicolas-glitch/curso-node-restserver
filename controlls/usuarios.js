const {response, request} = require('express');
const becryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


//mostrar usuarios
const mostrarUsuarios = async(req=request, res=response) =>{ 
    const usuario = req.usu;
    const query = {rol:'PACIENTE'}; 
    const [usuarios,total] = await Promise.all([
                     Usuario.find(query),
                     Usuario.countDocuments(query)
 ]);

    res.json({
        usuario,
        total,
       usuarios
       
    })
    
}

// agregar usuario
const usuariosPost = async (req=request, res=response) => {

        const {nombre,contraseña,rol} = req.body;  
         const usuario = new Usuario({nombre,contraseña,rol}); 
        //Encriptar la contraseña
        const salt = becryptjs.genSaltSync();
        usuario.contraseña = becryptjs.hashSync(contraseña,salt);        
        //guardar db
        await usuario.save();
        res.json({usuario});
    };
module.exports = {
    usuariosPost,
    mostrarUsuarios
    
}