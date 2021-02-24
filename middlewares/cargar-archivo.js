const { request, response } = require("express");




const verificarArchivo = (req=request,res=response,next) =>{
  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json('no se encontro ningun archivo');
      }
    next();
}



module.exports={
    verificarArchivo
}