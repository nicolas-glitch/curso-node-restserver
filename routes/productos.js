
const {Router} = require('express');
const { check } = require('express-validator');

const {crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto}= require('../controlls/productos');
const {  validarRol, productoExisteID, categoriaExisteID } = require('../helpers/validar-rol');
const {errorUsuario, validarToken, validarRoles} = require('../middlewares');


const router = Router();

//Mostrar todos los productos--publico
router.get('/',obtenerProductos);

//Mostrar un  producto--publico
router.get('/:id',[
    check('id','no es un id valido').isMongoId(),
    check('id').custom(productoExisteID),
    errorUsuario
],obtenerProducto);

//Agregar un producto--privado cualquier persona con un token valido
router.post('/',[
    validarToken,
    check('nombre','el nombre es necesario').not().isEmpty().toUpperCase(),
    check('categoria','la categoria es obligatoria').not().isEmpty(),
    check('categoria','no es un id valido').isMongoId(),
    check('categoria').custom(categoriaExisteID),
    errorUsuario
], crearProducto);
//Actualizar producto--privado cualquier persona con token valido
router.put('/:id',[
    validarToken,
    check('id','no es un id valido').isMongoId(),
    check('id').custom(productoExisteID),
    check('nombre','El campo del nombre es obligatorio').not().isEmpty(),
    errorUsuario
],actualizarProducto);



//Borrar producto --ADMIN
router.delete('/:id',[
    validarToken,
    validarRoles,
    check('id','no es un id valido').isMongoId(),
    check('id').custom(productoExisteID),
    errorUsuario
],borrarProducto);

module.exports= router;