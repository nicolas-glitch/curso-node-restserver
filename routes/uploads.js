const {Router} = require('express');
const { check } = require('express-validator');
const { uploads, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controlls/uploads');
const { validarColecciones } = require('../helpers');
const {errorUsuario,verificarArchivo} = require('../middlewares')

const router = Router();



router.post('/',verificarArchivo,uploads);


router.put('/:coleccion/:id',[
    verificarArchivo,
    check('coleccion').custom(c => validarColecciones(c,colecciones=['usuarios','productos'])),
    check('id','No es un id mongo').isMongoId(),
    errorUsuario

],actualizarImagenCloudinary);

router.get('/:coleccion/:id',[
    check('coleccion').custom(c => validarColecciones(c,colecciones=['usuarios','productos'])),
    check('id','No es un id mongo').isMongoId(),
    errorUsuario
], mostrarImagen);


module.exports= router;