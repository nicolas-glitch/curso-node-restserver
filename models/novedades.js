const { Schema, model } = require('mongoose')

const NovedadadesSchema = Schema({
    numeroCita:{
        type : Schema.Types.ObjectId,
        ref : 'Cita',
        required: true
    },
    observacion:{
        type: String,
        required:[true, 'La observación es requerida']
    },
    nombre:{
        type : Schema.Types.ObjectId,
        ref : 'Usuario',
        required: true
    },
    numero:{
        type: Number,
        require: [true,'El número es obligatorio']
    }




});

// NovedadadesSchema.methods.toJSON = function(){
//     const {__v,_id,...categoria}= this.toObject();
//     categoria.uid = _id;
//     return categoria

// }

module.exports= model('Novedade',NovedadadesSchema);
