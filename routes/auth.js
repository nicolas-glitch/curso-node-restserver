const {Router} = require('express');
const { check } = require('express-validator');
const {errorUsuario} = require('../middlewares/error-usuario')
const {authPost} = require('../controlls/auth')
const router = Router();



router.post('/login',[
    check('correo','el correo ingresado no es valido').isEmail(),
    check('contraseña','la contraseña es obligatoria').not().isEmpty(),
    errorUsuario
] ,authPost);



module.exports= router;