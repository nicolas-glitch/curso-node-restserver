const { response, request } = require("express");
const {ObjectId}=require('mongoose').Types;
const {Usuario,Categoria,Producto}=require('../models')
const coleccionesValidas = [
    'usuario',
    'categoria',
    'producto',
    'roles'
];

const buscarUsuario = async(termino='', res=response) =>{

    const idMongo = ObjectId.isValid(termino); //si es un id retorna true si no es un id retorna false
    if(idMongo){
        const usuarioId = await Usuario.findById(termino);
        return res.json({
            results:(usuarioId) ? [usuarioId] : []
        })
    }
    
    const regex = new RegExp(termino,'i');

    const usuarios = await Usuario.find({
        $or: [{nombre:regex},{correo:regex}],
        $and: [{estado:true}]
    });
    res.json({
        usuarios
    })
}
const buscarCategoria = async(termino='', res=response) =>{

    const idMongo = ObjectId.isValid(termino); //si es un id retorna true si no es un id retorna false
    if(idMongo){
        const categoriaId = await Categoria.findById(termino);
        return res.json({
            results:(categoriaId) ? [categoriaId] : []
        })
    }
    
    const regex = new RegExp(termino,'i');

    const categorias = await Categoria.find({
        $and: [{nombre:regex},{estado:true}]
    });
    res.json({
        categorias
    })
}

const buscarProducto = async(termino='', res=response) =>{

    const idMongo = ObjectId.isValid(termino); //si es un id retorna true si no es un id retorna false
    if(idMongo){
        const productoId = await Producto.findById(termino);
        return res.json({
            results:(productoId) ? [productoId] : []
        })
    }
    
    const regex = new RegExp(termino,'i');

    const productos = await Producto.find({
        $and: [{nombre:regex},{estado:true}]
    });
    res.json({
        productos
    })
}
const buscar = (req=request, res=response) =>{
    const {coleccion,termino}=req.params
    if(!coleccionesValidas.includes(coleccion)){
       return res.status(400).json({
            msg: `la ${coleccion}, no es valida, puede buscar por estas colecciónes ${coleccionesValidas}`
        })
    }

    switch(coleccion){
         case   'usuario':
                buscarUsuario(termino,res);
             break;

         case 'categoria':
                buscarCategoria(termino,res);
             break;

         case  'producto':
                buscarProducto(termino,res);
             break;

         default:
            res.status(500).json({
                msg:'error de base de datos'
            })
    }
    
}

module.exports={
    buscar
}