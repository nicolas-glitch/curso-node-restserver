const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
        nombre:{
            type: String,
            required:[true, 'El nombre es obligatorio']
        },
        correo:{
            type : String,
            required : [true, 'El email es obligatorio'],
    
        },
        contraseña:{
            type: String,
            required:[true,'la contraseña es requerida'],
        },
        img:{
            type: String,
        },
        rol:{
            type: String,
            required: true,
            emun: ['ADMIN_ROL','USER_ROL']
        },
        estado:{
            type: Boolean,
            default: true
        },
        google : {
            type: Boolean,
            default: false
        },



});


UsuarioSchema.methods.toJSON = function(){
    const {__v, contraseña, ...usuario} = this.toObject();
    return usuario;
}

module.exports = model('Usuario',UsuarioSchema);