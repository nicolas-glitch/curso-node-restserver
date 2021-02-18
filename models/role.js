const { Schema, model } = require('mongoose')

const RolSchema = Schema({
    rol:{
        type: String,
        required:[true, 'El valor de rol es requerido']
    }
});

module.exports= model('role',RolSchema);
