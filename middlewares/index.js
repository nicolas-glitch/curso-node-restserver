

const validarTokens = require('../middlewares/validar-token');
const  error= require('../middlewares/error-usuario');
const validarRolescar = require('../middlewares/validar-rol');
const validarArchivo = require('../middlewares/cargar-archivo');



module.exports={
    ...validarTokens,
    ...error,
    ...validarRolescar,
    ...validarArchivo
}