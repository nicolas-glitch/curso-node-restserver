const {Router} = require('express');
const {usuariosGet,
       usuariosPost,
       usuariosPut,
       usuariosPatch,
       usuariosDelete
      } = require('../controlls/usuarios');
const router = Router();

    router.get('/', usuariosGet);
    router.post('/', usuariosPost);
    router.put('/:id', usuariosPut);
    router.delete('/', usuariosDelete);
    router.patch('/', usuariosPatch);


module.exports = router;