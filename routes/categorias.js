const {Router} = require('express');
const { check } = require('express-validator');

const {crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria}= require('../controlls/categorias');
const { categoriaExisteID, validarRol } = require('../helpers/validar-rol');
const {errorUsuario, validarToken, validarRoles} = require('../middlewares');


const router = Router();

//Mostrar todas las categorias--publico
router.get('/',obtenerCategorias)

//Mostrar una  categoria--publico
router.get('/:id',[
    check('id','no es un id valido').isMongoId(),
    check('id').custom(categoriaExisteID),
    errorUsuario
],obtenerCategoria)

//Agregar una categoria--privado cualquier persona con un token valido
router.post('/',[
    validarToken,
    check('nombre','EL nombre es requerido').not().isEmpty(),
    errorUsuario
], crearCategoria);
//Actualizar categoria--privado cualquier persona con token valido
router.put('/:id',[
    validarToken,
    check('id','no es un id valido').isMongoId(),
    check('id').custom(categoriaExisteID),
    check('nombre','El campo del nombre es obligatorio').not().isEmpty(),
    
    errorUsuario
],actualizarCategoria);



//Borrar categoria --ADMIN
router.delete('/:id',[
    validarToken,
    //validar el rol de admnin
    // check('rol').custom(validarRol),
    validarRoles,
    check('id','no es un id valido').isMongoId(),
    check('id').custom(categoriaExisteID),
    errorUsuario
],borrarCategoria)
module.exports= router;