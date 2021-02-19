const {response, request} = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarToken = async(req=request,res=response,netx)=> {

      const token = req.header('x-token');
      if(!token){
          return res.status(401).json({
              mis:'No hay token en la petición'
          })
      }
    try {
       const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);
       

       const usuario = await Usuario.findById(uid);
       //si uid existe en la base de datos
       if(!usuario){
           res.status(401).json({
               msg:'el id no existe en la base de datos'
           })
       }
       //Verificar si el id esta habilitado
       if(!usuario.estado){
        res.status(401).json({
            msg:'el usuario esta inhabilitado'
        })
       }
        
       req.usu = usuario; 
    

        netx();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'token no valido '
        })
    }

    
}


module.exports={
    validarToken
}