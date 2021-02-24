const validarRol = require('./validar-rol');
const googleVerify = require('./google-verify');
const crearJwt = require('./crear-jwt');
const subirArchivos = require('./subir-archivo');


module.exports = {
    ...validarRol,
    ...googleVerify,
    ...crearJwt,
    ...subirArchivos
}