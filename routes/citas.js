const {Router} = require('express');
const { check } = require('express-validator');
const { CrearCita,mostrarCitas,mostrarUsuario } = require('../controlls/citas');
const {existeId} =  require('../helpers/elegir-rol')
const {errorUsuario} = require('../middlewares/error-usuario')
const {validarToken} = require('../middlewares/validar-token')


const router = Router();


router.get('/:id',[
    validarToken,
    check('id','no es un id mongo').isMongoId(),
    check('id').custom(existeId),
    errorUsuario
],mostrarCitas);


router.get('/',mostrarUsuario);

router.post('/:id',[
    validarToken,
    check('id','no es un mongoId').isMongoId(),
    check('id').custom(existeId),
    check('fecha','la fecha es obligatoria').not().isEmpty(),
    check('especialidad','la especialidad es obligatoria').not().isEmpty(),
    errorUsuario
] ,CrearCita);





module.exports= router;