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

module.exports={
    validarRol,
    existeEmail,
    actualizarExisteID,
    
}

// const existeEmail= await Usuario.findOne({correo});
// if(existeEmail){
//     return res.status(400).json({
//         error: 'Este correo ya existe'
//     });
// }