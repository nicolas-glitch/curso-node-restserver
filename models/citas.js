const { Schema, model } = require('mongoose')

const CitaSchema = Schema({
    paciente:{
        type : Schema.Types.ObjectId,
        ref : 'Usuario',
        required: false
    },
    fecha:{
        type: String,
        required: true
    },
    especialidad:{
        type: String,
        required:[true, 'la especialidad es requerida']
    },
    novedades:{
        type : Schema.Types.ObjectId,
        ref : 'Novedade',
        required: false
    },
    
    

});

// CategoriaSchema.methods.toJSON = function(){
//     const {__v,_id,...categoria}= this.toObject();
//     categoria.uid = _id;
//     return categoria

// }

module.exports= model('Cita',CitaSchema);
