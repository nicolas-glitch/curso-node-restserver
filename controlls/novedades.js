const {response, request} = require('express');
const Cita = require('../models/citas');
const Novedad =  require('../models/novedades');
const Usuario =  require('../models/usuario');


const mostrarCita = async(req=request,res=response)=>{
    const {especialidad,paciente} = req.headers;
    const cita = await Cita.findOne({especialidad,paciente});  

    if(!cita){
        res.status(400).json({
            msg: `la cita con la  ${especialidad} no existe`
        })
    }
    res.json({
        cita
    })
};


const mostrarNovedad = async(req=request,res=response)=>{
    const {paciente} = req.headers;
    const usuario = await Usuario.findOne({nombre:paciente});
    const {_id} = usuario;
    const novedades = await Novedad.find({nombre:_id});
    const citas = await Cita.find({paciente:_id});  

    if(!usuario){
        res.status(400).json({
            msg: `el  usuario ${especialidad} no existe`
        })
    }
    res.json({
        usuario,
        citas,
        novedades
    })
};

const CrearNovedad = async(req=request,res=response) =>{
    const {id} = req.params;
    const {observacion,numero} = req.body;
    const {nombre,rol,_id,numeroPaciente} = req.usu;    
    //validamos que el usuario sea un paciente
    if(rol === 'ADMINISTRADOR'){
        return res.json({
            alerta: `el usuario ${nombre}, no puede hacer una observacion ya que es un ${rol}`
        })
    }
    //buscar la cita que le asignaron
    const citaAsignada = await Cita.findById(id);

    //mirar si tiene un número de paciente
    if(!numeroPaciente){
        let usuarioNumero = await Usuario.findOne({numeroPaciente:numero});
        //validamos que no hayan dos números repetidos
        if(usuarioNumero){
            return res.status(400).json({
               alerta: `ya existe un usuario con este número digite otro`
           })
        }
        //actualizamos el número del paciente
        usuarioNumero = await Usuario.findByIdAndUpdate(_id,{numeroPaciente:numero});
        
    }

    
    //verficar que tengan el mismo número
    if( numeroPaciente != numero){
        return res.status(400).json({
            alerta: `el usuario ${nombre}, tiene otro numero de paciente`
        });

    }
    // verificar que no se repita la misma cita y observación
    const mismaCita =  await Novedad.findOne({numeroCita:id,observacion,numero});
    
    if(mismaCita){
        if(mismaCita.observacion == observacion  && mismaCita.numeroCita == id){
            return res.status(400).json({
                alerta: `el usuario ${nombre} ya tiene esta cita y esta observación ${observacion}`
            })
        }
    }
    const mismaObservacion =  await Novedad.findOne({observacion,numero});

    // verificar que no se repita la misma observacion
    // crear la data
    const data = {
        numeroCita: citaAsignada,
        observacion,
        nombre: req.usu,
        numero
    }  
    const novedad = new Novedad(data);
    //guardar en la base de datos
    await novedad.save();

    // actualizar la observacion en las citas
    const citaObsevacion = await Cita.findByIdAndUpdate(id,{novedades: novedad });
    res.json({
        novedad
    })


}



module.exports={
     CrearNovedad,
     mostrarCita,
     mostrarNovedad
}


    // //verificamos que la cita exista
    // const usuarioCita = await Cita.findOne({paciente:_id});
    // //si la cita existe
    // if(usuarioCita){
    // const usuarioNovedad =  await Novedad.find({_id:usuarioCita.novedades});
    // if(usuarioNovedad){
    //     usuarioNovedad.forEach(novedad =>{
        
    //         if(novedad.observacion == observacion){
    //             return res.status(400).json({
    //                 errors: `el usuario ${novedad.nombre} ya tiene la novedad ${observacion}, por favor digite otro`
    //             });
    //         }
    //     });
    
    //     }
    // }



