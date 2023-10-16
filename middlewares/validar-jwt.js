const { response, request } = require('express')
const jwt =require('jsonwebtoken')



const Usuario = require('../models/usuario')
const usuario = require('../models/usuario')

const validarJWT = async(req = request,res =response, next) =>{
    
    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({
            msg:"no hay"
        })
    }
    try {
      const {uid} = jwt.verify(token,process.env.SECRETORPRIVETEKEY)


    const usuario =  await Usuario.findById(uid);
    

    if(!usuario){
        return res.status(401).json({
            msg:'Token no valido - usuario no existe en db '
        })
    }
    //verificar si uuid tiene estado en true;
    if(!usuario.estado){
        return res.status(401).json({
            msg:'Token no valido - '
        })
    }

    req.usuario= usuario;



        next();

    } catch (error) {
        res.status(401).json({
            msg:'Token no valido'
        })
    }

    
}
module.exports = {
    validarJWT
}