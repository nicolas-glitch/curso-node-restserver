const { Router}= require('express');
const { buscar } = require('../controlls/buscar');

const router = Router();


router.get('/:coleccion/:termino', buscar);




module.exports = router;