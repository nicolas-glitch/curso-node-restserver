const {Router} = require('express');
const { check } = require('express-validator');
const { validarRol, 
        existeEmail, 
        actualizarExisteID,
        existeNombre,
        validarAdmin,
        validarEstado,
        
        } = require('../helpers/validar-rol');
const {validarToken,errorUsuario,validarTodos}= require('../middlewares')
// const { validarToken } = require('../middlewares/validar-token');
// const {errorUsuario} = require('../middlewares/error-usuario');
// const {validarRoles,validarTodos } = require('../middlewares/validar-rol');
const {usuariosGet,
       usuariosPost,
       usuariosPut,
       usuariosPatch,
       usuariosDelete,
       usuarioGet
      } = require('../controlls/usuarios');


const router = Router();
    //mostrar usuarios
    router.get('/',usuariosGet);
    //check de post
    router.post('/',[
        // validarToken,
        check('nombre','El campo del nombre es obligatorio').custom(existeNombre).not().isEmpty(),
        check('contraseña','la contraseña debe tener un minimo de 6 caracters y un maximo de 10 caracters').isLength({min:6, max:10}),
        check('correo').custom(existeEmail).isEmail(),
        check('rol').custom(validarRol),
        errorUsuario
    ] ,usuariosPost);

    //check de put
    router.put('/:id',[
        validarToken,
        check('id','no es un id valido').isMongoId(),
        check('id').custom(validarEstado),
        check('id').custom(actualizarExisteID),
        check('nombre','El campo del nombre es obligatorio').not().isEmpty(),
        check('contraseña','la contraseña es requerida').not().isEmpty(),
        check('correo').isEmail(),
        check('rol').custom(validarAdmin),
        errorUsuario
    ],usuariosPut);


    //check delete
    router.delete('/:id',[
        validarToken,
        //validarRoles,
        check('rol').custom(validarAdmin),
        check('id','no es un id valido').isMongoId(),
        check('id').custom(actualizarExisteID),
        errorUsuario
    ], usuariosDelete);



    router.patch('/', usuariosPatch);


module.exports = router;