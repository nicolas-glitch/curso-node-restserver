const {request,response}= require('express');

const {Producto,Categoria } = require('../models');



//obtener Productos- paginado- total-populato
const obtenerProductos= async(req=request,res=response)=>{
    const {limite,desde}= req.query;
    const query = {estado:true};
   
    const [total,producto]= await Promise.all([
         Producto.countDocuments(query),
         Producto.find(query)
        .populate('usuario','nombre')
        .populate('producto')
        .skip(Number(desde))
        .limit(Number(limite))
    ])
    res.json({total,producto})

}

//obtenerProducto-populato 
const obtenerProducto = async(req=request,res=response) =>{

    const {id} =req.params;
    const producto = await Producto.findById(id)
                            .populate('usuario','nombre')
                            .populate('categoria');
    
    
    res.json({
          producto
    })

}




//crear Producto
const crearProducto = async(req=request,res=response)=>{
    const {usuario,disponible,nombre,categoria,precio,...resto} = req.body;

    //buscar el nombre en la base de datos
    const productoDB = await Producto.findOne({nombre});
    //preguntar si la producto ya existe
    if(productoDB){
        return res.status(400).json({
            msg: `el producto ${productoDB.nombre}, ya existe`
        })
    }


     //Crear nueva producto
    const data={
        resto,
        nombre,
        usuario: req.usu._id,
        categoria
    }
    const producto = new Producto(data);
    
     //Guardar en la base de datos

     await producto.save();

     //mostrar la producto creada

    res.status(201).json({
        producto
    });

}


//actualizar  Producto

const actualizarProducto = async(req=request,res=response)=>{
    const {id} =req.params;
    const {estado,usuario,categoria,...data} = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usu._id;    
    // const categoria =   await Categoria.findById(id);
    // console.log(categoria);
    // if(data === categoria.nombre){
    //    return res.json({
    //         msg: "Este producto ya existe"
    //     })
    // }
    const producto = await Producto.findByIdAndUpdate(id,data,{new:true});
    res.json(producto);
}


//borrar Producto
const borrarProducto = async(req=request,res=response) =>{
    const {id} = req.params;
        
    const producto = await Producto.findByIdAndUpdate(id, {estado :false});

    res.json(producto);
}

module.exports={
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}