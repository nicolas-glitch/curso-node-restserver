const {response, request} = require('express');
const becryptjs = require('bcryptjs');

const Usuario = require('../models/usuario'); 
const { generarJWT } = require('../helpers/crear-jwt');

const authPost = async(req,res) =>{

        const {correo,contraseña} = req.body;



        try {
            const usuario = await Usuario.findOne({correo});

            //verificar si correo existe
            if(!usuario){
                return res.status(400).json({
                    error:'el correo o la clave son incorrectos -correo'
                })
            }

            //verificar si el usuario sigue activo
            if(!usuario.estado){
                return res.status(400).json({
                    error:'el usuario no esta registrado'
                })
            }
            //verificar la contraseña
            const contraseñaCorrecta = becryptjs.compareSync(contraseña,usuario.contraseña);
            if(!contraseñaCorrecta){
                return res.status(400).json({
                    error:'el correo o la clave so incorrectos -clave'
                })
            }

            //crear el token

            const token = await generarJWT(usuario.id);

            res.json({
            usuario,
            token
 
        })            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg:'error en la base de datos' 
            })
        }

}


module.exports={
    authPost
}