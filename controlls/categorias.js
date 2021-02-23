const {request,response}= require('express');

const {Categoria } = require('../models');



//obtener categorias- paginado- total-populato
const obtenerCategorias= async(req=request,res=response)=>{
    const {limite,desde}= req.query;
    const query = {estado:true};
   
    const [total,categoria]= await Promise.all([
         Categoria.countDocuments(query),
         Categoria.find(query)
        .populate('usuario','nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ])
    res.json({total,categoria})

}

//obtenerCategoria-populato 
const obtenerCategoria = async(req=request,res=response) =>{
 
            const {id} =req.params;
            const categoria = await Categoria.findById(id).populate('usuario','nombre');
            
            
            res.json({
                  categoria
            })

}




//crear categoria
const crearCategoria = async(req=request,res=response)=>{
    const nombre = req.body.nombre.toUpperCase();

    //buscar el nombre en la base de datos
    const categoriaDB = await Categoria.findOne({nombre});
    //preguntar si la categoria ya existe
    if(categoriaDB){
        return res.status(400).json({
            msg: `la categoria ${categoriaDB.nombre}, ya existe`
        })
    }


     //Crear nueva categoria
    const data={
        nombre,
        usuario: req.usu._id
    }
    const categoria = new Categoria(data);
    console.log(categoria);
     //Guardar en la base de datos

     await categoria.save();

     //mostrar la categoria creada

    res.status(201).json({
        categoria
    });

}


//actualizar  categoria

const actualizarCategoria = async(req=request,res=response)=>{
    const {id} =req.params;
    const {estado,usuario,...data} = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usu._id;    
    // const categoria =   await Categoria.findById(id);
    // console.log(categoria);
    // if(data === categoria.nombre){
    //    return res.json({
    //         msg: "Este producto ya existe"
    //     })
    // }
    const categoria = await Categoria.findByIdAndUpdate(id,data,{new:true});
    res.json(categoria);
}


//borrar categoria
const borrarCategoria = async(req=request,res=response) =>{
        const {id} = req.params;
        
        const categoriaBorrado = await Categoria.findByIdAndUpdate(id, {estado :false});

        res.json(categoriaBorrado);
}

module.exports={
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}