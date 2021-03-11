const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
        nombre:{
            type: String,
            required:[true, 'El nombre es obligatorio']
        },
        contraseña:{
            type: String,
            required:[true,'la contraseña es requerida'],
        },
        rol:{
            type: String,
            required: true,
            default:'PACIENTE',
            emun: ['ADMINISTRADOR','PACIENTE']
        },
        numeroPaciente:{
            type: Number,
            require: false
        }


});


UsuarioSchema.methods.toJSON = function(){

    const {__v,_id,...usuario} = this.toObject();
    usuario.uid = _id;
    

    return usuario;
}


module.exports = model('Usuario',UsuarioSchema);