const {Router} = require('express');
const { check } = require('express-validator');
const { CrearNovedad,mostrarCita, mostrarNovedad } = require('../controlls/novedades');
const {existeIdCita, existeObservacion} =  require('../helpers/elegir-rol')
const {errorUsuario} = require('../middlewares/error-usuario')
const {validarToken} = require('../middlewares/validar-token')


const router = Router();

router.get('/cita',mostrarCita);

router.get('/',mostrarNovedad);

router.post('/:id',[
    validarToken,
    check('id','no es un mongoId').isMongoId(),
    check('id').custom(existeIdCita),
    check('observacion','la observación es necesaria').not().isEmpty(),
    check('observacion').custom(existeObservacion),
    check('numero','El número de usuario es necesario').not().isEmpty(),
    check('numero','Tiene que ser un número').isNumeric(),

    errorUsuario
] ,CrearNovedad);





module.exports= router;