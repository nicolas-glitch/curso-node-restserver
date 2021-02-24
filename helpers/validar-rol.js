const { Categoria, Producto } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');


const validarRol=async(rol ='') =>{
                const rolExiste = await Role.findOne({rol});
                if(!rolExiste){
                    throw new Error(`el ${rol} no Existe en la base de datos`);
                }
            }
//verificar si el correo existe
 const existeEmail =async(correo= '') =>{
     const Emailexiste = await Usuario.findOne({correo});
     if(Emailexiste){
         throw new Error(`El correo ${correo} ya existe`);
     }
 }
// verificar si id existe
 const actualizarExisteID =async(id) =>{
    const existeId = await Usuario.findById(id);
    if(!existeId){
        throw new Error(`No existe un usuario con el id:${id}`);
    }
}
const categoriaExisteID =async(id) =>{
    const existeId = await Categoria.findById(id);
    if(!existeId){
        throw new Error(`No existe una categoria con el id:${id}`);
    }
}


const productoExisteID =async(id) =>{
    const existeId = await Producto.findById(id);
    if(!existeId){
        throw new Error(`No existe una producto con el id:${id}`);
    }
}

const validarColecciones = (coleccion='',colecciones=[])=>{
    const incluye =  colecciones.includes(coleccion);
    if(!incluye){
        throw new Error(`La colección ${coleccion}, no existe, intente con estas ${colecciones}`);
    }
    return true;
}
module.exports={
    validarRol,
    existeEmail,
    actualizarExisteID,
    categoriaExisteID,
    productoExisteID,
    validarColecciones
    
}

// const existeEmail= await Usuario.findOne({correo});
// if(existeEmail){
//     return res.status(400).json({
//         error: 'Este correo ya existe'
//     });
// }