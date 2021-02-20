const {Router} = require('express');
const { check } = require('express-validator');
const {errorUsuario} = require('../middlewares/error-usuario')
const {authPost,tokenGoogle} = require('../controlls/auth')
const router = Router();



router.post('/login',[
    check('correo','el correo ingresado no es valido').isEmail(),
    check('contraseña','la contraseña es obligatoria').not().isEmpty(),
    errorUsuario
] ,authPost);

router.post('/google',[
    check('id_token','EL id_token es necesario').not().isEmpty(),
    errorUsuario
] ,tokenGoogle);

module.exports= router;