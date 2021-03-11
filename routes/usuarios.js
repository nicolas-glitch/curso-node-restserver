const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosPost,mostrarUsuarios} = require('../controlls/usuarios');
const {elegirRol, nombreRepetido} = require('../helpers/elegir-rol')
const { validarToken } = require('../middlewares/validar-token');
const {errorUsuario,} = require('../middlewares/error-usuario');

// const {validarRoles,validarTodos } = require('../middlewares/validar-rol');


const router = Router();
    router.get('/',[
        validarToken
    ],mostrarUsuarios);
    //Crear usuarios
    router.post('/',[
        check('nombre','El nombre es requerido').not().isEmpty(),
        check('nombre','El nombre es requerido').custom(nombreRepetido),
        check('contraseña','la contraseña es requerida').not().isEmpty(),
        check('rol', 'El rol es requerido').not().isEmpty(),
        check('rol').custom(elegirRol),
        errorUsuario
    ],usuariosPost);



module.exports = router;