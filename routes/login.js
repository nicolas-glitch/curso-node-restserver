const {Router} = require('express');
const { check } = require('express-validator');
const {errorUsuario} = require('../middlewares/error-usuario')
const {loginPost} = require('../controlls/login');
const router = Router();



router.post('/',[
    check('nombre','el nombre es necesario').not().isEmpty(),
    check('contraseña','la contraseña es obligatoria').not().isEmpty(),
    errorUsuario
] ,loginPost);





module.exports= router;