const {Router} = require('express');
const { check } = require('express-validator');
const { validarRol, 
        existeEmail, 
        actualizarExisteID 
        } = require('../helpers/validar-rol');
const {validarToken,errorUsuario,validarRoles,validarTodos}= require('../middlewares')
// const { validarToken } = require('../middlewares/validar-token');
// const {errorUsuario} = require('../middlewares/error-usuario');
// const {validarRoles,validarTodos } = require('../middlewares/validar-rol');
const {usuariosGet,
       usuariosPost,
       usuariosPut,
       usuariosPatch,
       usuariosDelete
      } = require('../controlls/usuarios');


const router = Router();

    router.get('/',usuariosGet);
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
        check('correo').isEmail(),
        check('rol').custom(validarRol),
        errorUsuario
    ],usuariosPut);
    //check delete
    router.delete('/:id',[
        validarToken,
        //validarRoles,
        check('rol').custom(validarRol),
        validarTodos('ADMIN_ROL','USER_ROL','VENTAS_ROL'),
        check('id','no es un id valido').isMongoId(),
        check('id').custom(actualizarExisteID),
        errorUsuario
    ], usuariosDelete);
    router.patch('/', usuariosPatch);


module.exports = router;