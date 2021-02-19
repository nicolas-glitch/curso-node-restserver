

const validarTokens = require('../middlewares/validar-token');
const  error= require('../middlewares/error-usuario');
const validarRolescar = require('../middlewares/validar-rol');


module.exports={
    ...validarTokens,
    ...error,
    ...validarRolescar
}