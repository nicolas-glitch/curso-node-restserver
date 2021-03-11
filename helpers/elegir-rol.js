
const Usuario = require('../models/usuario');
const Cita = require('../models/citas')
const roles = ['ADMINISTRADOR','PACIENTE'];
const elegirRol =  async(rol='') =>{

    //verificar si el rol existe
    if(!roles.includes(rol)){
        throw new Error(`El rol ${rol} digitado no existe, intente con ${roles}`);
    }
    return true;

   
};
const nombreRepetido = async(nombre='') =>{

    const usuario =  await Usuario.findOne({nombre});

    if(usuario){
        throw new Error(`el usuario ${usuario.nombre}, ya existe por favor digite otro`)
    }
    return true
};

const existeId = async(id ='') =>{
    const usuario = await Usuario.findById(id);
    if(!usuario){
        throw new Error('Este usuario no existe');
    }
    return true;
};
const existeIdCita = async(id ='') =>{
    const cita = await Cita.findById(id);
    if(!cita){
        throw new Error('Esta cita no existe');
    }
    return true;
};
 

const existeObservacion = async(observacion ='') =>{
    const cita = await Cita.findOne({observacion});
    if(cita){
        throw new Error('Esta observación ya existe, digite otra');
    }
    return true;
};
module.exports = {
    elegirRol,
    nombreRepetido,
    existeId,
    existeIdCita,
    existeObservacion
}
