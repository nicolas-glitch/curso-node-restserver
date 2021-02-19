const {response, request} = require('express');



const validarRoles= (req=request,res=response,next) =>{

    if(!req.usu){
        res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        })
    }
    const usuario = req.usu;
    if(usuario.rol !== 'ADMIN_ROL'){
        res.status(401).json({
            msg: 'el usuario no es administrador no puede ejecutar la eleminación'
        })
    }

    next();

}

const validarTodos = (...roles)=>{

    return (req=request,res=response,next)=>{

        if(!req.usu){
            res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }
        const usuario= req.usu;
        if(!roles.includes(usuario.rol)){
            res.status(401).json({
                msg:`el rol debe ser algúno de estos ${roles}`
            })
        }
        next()
    }
}

module.exports={
    validarRoles,
    validarTodos
}