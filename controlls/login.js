const {response, request} = require('express');
const becryptjs = require('bcryptjs');

const Usuario = require('../models/usuario'); 
const { generarJWT } = require('../helpers/generar-JWT');

const loginPost = async(req=request,res=response) =>{

        const {nombre,contraseña} = req.body;


        
        try {
            const usuario = await Usuario.findOne({nombre});

            //verificar si correo existe
            if(!usuario){
                return res.status(400).json({
                    msg:'el nombre o la clave son incorrectos'
                })
            }


            //verificar la contraseña
            const contraseñaCorrecta = becryptjs.compareSync(contraseña,usuario.contraseña);
            if(!contraseñaCorrecta){
                return res.status(400).json({
                    msg:'el nombre o la clave son incorrectos '
                })
            }
            //verificar si el usuario sigue activo


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
    loginPost
}