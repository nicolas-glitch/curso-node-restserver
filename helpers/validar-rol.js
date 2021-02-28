const { Categoria, Producto } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');


const validarRol=async(rol ='') =>{
                const rolExiste = await Role.findOne({rol});
                if(!rolExiste){
                    throw new Error(`el ${rol} no Existe en la base de datos`);
                }
            }
//verificar si es admin
const validarAdmin=async(rol ='') =>{

    const usuario = await Usuario.findOne({rol}); 

    if(usuario.rol !== 'ADMIN_ROL'){
        throw new Error(`El usuario ${usuario.nombre} ${usuario.rol} no puede actualizar`);
    }
    return true;
}
//verficar si el usuario esta en estado true
const validarEstado=async(id ='') =>{

    const usuario = await Usuario.findById(id); 

    if(!usuario.estado){
        throw new Error(`El usuario ${usuario.nombre}, esta en estado ${usuario.estado} no puede actualizar`);
    }
    return true;
}
//verificar si el correo existe
 const existeEmail =async(correo= '') =>{
     const Emailexiste = await Usuario.findOne({correo});
     if(Emailexiste){
         throw new Error(`El correo ${correo} ya existe`);
     }
     return true;
 }
//verificar si el nombre del usuario ya existe
const existeNombre = async(nombre='') =>{
    const nombreExiste = await Usuario.findOne({nombre});
    if(nombreExiste){
        throw new Error(`El nombre ${nombre} ya existe, por favor digite otro`);
    }
    return true;
}
// verificar si id existe
 const actualizarExisteID =async(id) =>{
    const existeId = await Usuario.findById(id);
    if(!existeId){
        throw new Error(`No existe un usuario con el id:${id}`);
    }
    return true;
}
const categoriaExisteID =async(id) =>{
    const existeId = await Categoria.findById(id);
    if(!existeId){
        throw new Error(`No existe una categoria con el id:${id}`);
    }
    return true;
}




const productoExisteID =async(id) =>{
    const existeId = await Producto.findById(id);
    if(!existeId){
        throw new Error(`No existe una producto con el id:${id}`);
    }
    return true;
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
    validarColecciones,
    existeNombre,
    validarAdmin,
    validarEstado,
    
}

// const existeEmail= await Usuario.findOne({correo});
// if(existeEmail){
//     return res.status(400).json({
//         error: 'Este correo ya existe'
//     });
// }