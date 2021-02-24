const { request, response } = require("express");
const { subirArchivo } = require("../helpers");
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const path = require('path');
const fs = require('fs');
const { Usuario, Producto } = require("../models");


const uploads = async(req=request,res=response) =>{
    
    const nombreId = await subirArchivo(req.files,undefined,'img');

    res.json(nombreId)
}
const actualizarImagen = async(req=request,res=response) =>{
    const {coleccion,id} = req.params;

 

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                 return res.status(400).json({msg:`El id ${id }, no existe en la base de datos`});
            }
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
               return  res.status(400).json({msg:`El id ${id }, no existe en la base de datos`});
            }
        break;
        
        default:
        return  res.status(500).json({msg: 'lo lamento no hice este caso :(('});
    }
    if(modelo.img){
        //borrar imagen 
        const PathImagen = path.join(__dirname,'../uploads/',coleccion,modelo.img);
        if(fs.existsSync(PathImagen)){
            fs.unlinkSync(PathImagen);
        }
    }
    

    const nombreId = await subirArchivo(req.files,undefined,coleccion);

    modelo.img = nombreId; 

    await modelo.save();

    res.json(modelo);
}



const actualizarImagenCloudinary = async(req=request,res=response) =>{
    const {coleccion,id} = req.params;

 

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                 return res.status(400).json({msg:`El id ${id }, no existe en la base de datos`});
            }
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
               return  res.status(400).json({msg:`El id ${id }, no existe en la base de datos`});
            }
        break;
        
        default:
        return  res.status(500).json({msg: 'lo lamento no hice este caso :(('});
    }
    if(modelo.img){
        //borrar imagen 
        const imagenCortada = modelo.img.split('/');
        const imagenId = imagenCortada[imagenCortada.length-1];
        const [imagen_id] = imagenId.split('.');
        
         cloudinary.uploader.destroy(imagen_id); 
    }
    
    

    const { tempFilePath }=req.files.archivo;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath )
    modelo.img = secure_url;
    
    await modelo.save();

    

    

    res.json(modelo);
}



const mostrarImagen =  async(req=request,res=response) =>{

    const {coleccion,id} = req.params;

    const noImagen = path.join(__dirname,'../assets/no-image.jpg');

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                 return  res.sendFile(noImagen);
            }
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
               return  res.sendFile(noImagen);
            }
        break;
        
        default:
        return  res.status(500).json({msg: 'lo lamento no hice este caso :(('});
    }
    if(modelo.img){
        //mostrar imagen 
        const PathImagen = path.join(__dirname,'../uploads/',coleccion,modelo.img);
        if(fs.existsSync(PathImagen)){
            return res.sendFile(PathImagen);
        }
    }
     
    
 
    res.sendFile(noImagen);

}

module.exports={
    uploads,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
    
}