const {response, request} = require('express');



const usuariosGet =((req= request, res = response) => {
               const {q,nombre,edad} = req.query; 
               res.json({
                informacion: 'Api desde get-controlls',
                q,
                nombre,
                edad

            });
});

const usuariosPost =((req, res) => {

        const {nombre,edad} = req.body;     
        res.json({
            informacion: 'Api desde post-controlls',
            nombre,
            edad
         
        });
    });

const usuariosPut = ( (req, res) => {
        const {id} = req.params;
        res.json({
            informacion: 'Api desde put-controlls',
            id
        });
    });

const usuariosPatch = ((req, res) => {
        res.status(401).json({
            informacion: 'Api desde patch-controlls'
        });
    });


const usuariosDelete = ( (req, res) => {
        res.json({
            informacion: 'Api desde delete-controlls'
        });
    });


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}