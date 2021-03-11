const {response, request} = require('express');

const Usuario = require('../models/usuario');
const Cita = require('../models/citas');




const mostrarCitas = async(req=request,res=response)=>{
    const {id}  =req.params;
    const usuario = req.usu;
    const query = {paciente:id}; 
    const [citas,total] = await Promise.all([
                     Cita.find(query),
                     Cita.countDocuments(query)
 ]);
    
 
     
    res.json({usuario,total,citas});
};

const mostrarUsuario = async(req=request,res=response)=>{

    const {nombre} = req.headers;
    
    const usuarioCitado = await Usuario.findOne({nombre});
    if(!usuarioCitado){
        res.status(400).json({
            msg:`el usuario ${nombre} no existe`
        })
    }
    
 
     
    res.json({usuarioCitado});
};


const CrearCita = async(req=request,res=response) =>{
    const {fecha, especialidad} = req.body;
    const{_id} = req.usu;
    const {id} = req.params;

     //llamamos al usuario Administrador
    const usuarioAdministrador =  await Usuario.findById(_id);
    const {nombre,rol} = usuarioAdministrador;
    //verificar que es administrador
    if(rol === 'PACIENTE'){
        return res.status(400).json({
            alerta: `el usuario ${nombre}, no es administrador`
        })
    }
    //llamamos al usuario Paciente
    const usuarioPaciente = await Usuario.findById(id);
    //verificar que no se repita la misma cita con la misma especialidad
    const usuarioCita = await Cita.findOne({paciente:id,especialidad});
    if(usuarioCita){
        return res.status(400).json({
            alerta: `el usuario ${usuarioPaciente.nombre} ya tiene una cita con la especialidad ${especialidad}`
        })
    }
    
    //creal al data
    const data = {
        paciente : usuarioPaciente,
        fecha,
        especialidad
    }
    //crear la cita
    const cita = new Cita(data);
    //guardar en la base de datos
    await cita.save();

    
    res.json({
        cita
    })

}



module.exports={
    CrearCita,
    mostrarCitas,
    mostrarUsuario
}