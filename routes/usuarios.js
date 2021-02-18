const {Router} = require('express');
const { check } = require('express-validator');
const { validarRol, 
        existeEmail, 
        actualizarExisteID 
        } = require('../helpers/validar-rol');
const {errorUsuario} = require('../middlewares/error-usuario')
const {usuariosGet,
       usuariosPost,
       usuariosPut,
       usuariosPatch,
       usuariosDelete
      } = require('../controlls/usuarios');

const router = Router();

    router.get('/', usuariosGet);
    //check de post
    router.post('/',[
        check('nombre','El campo del nombre es obligatorio').not().isEmpty(),
        check('contraseña','la contraseña debe tener un minimo de 6 caracters').isLength({min:6}),
        check('correo').custom(existeEmail).isEmail(),
        check('rol').custom(validarRol),
        errorUsuario
    ] ,usuariosPost);

    //check de put
    router.put('/:id',[
        check('id','no es un id valido').isMongoId(),
        check('id').custom(actualizarExisteID),
        check('nombre','El campo del nombre es obligatorio').not().isEmpty(),
        check('correo').custom(existeEmail).isEmail(),
        check('rol').custom(validarRol),
        errorUsuario
    ],usuariosPut);
    router.delete('/:id',[
        check('id','no es un id valido').isMongoId(),
        check('id').custom(actualizarExisteID),
        check('rol').custom(validarRol),
        errorUsuario
    ], usuariosDelete);
    router.patch('/', usuariosPatch);


module.exports = router;