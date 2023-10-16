const { response } = require("express");
const bcryptjs = require('bcryptjs'); 

const Usuario = require('../models/usuario');


const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require("../helpers/google-verify");


const login = async(req,res = response) =>{

    const {correo,password} = req.body;

    try {
        //verifivar si el correo existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario / password no son correctos -correo'
            });
        }
        //si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario / password no son correctos -estado'
            });

        }
        //verificar el password
        const validPassword =  bcryptjs.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario / password no son correctos -password'
            });
        }
       //generar token
        const token = await generarJWT(usuario.id)

        res.json({
           usuario,
           token
         })
    } catch (error) {
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

const googleSingIn = async(req,res = response) =>{

    const {id_token} = req.body;

    try {
        const {correo,nombre,img} = await googleVerify( id_token);

        let usuario = await Usuario.findOne({correo});

        if( !usuario ){
            //tengo que crearlo
            const data = {
                nombre,
                correo,
                password:':(',
                img,  
                google: true,
                role: 'USER_ROLE'                                                                                                                                                                         
            };

            usuario = new Usuario( data );
            await usuario.save();
        }
        // si el usuario en DB 
        if(!usuario.estado){
            return res.status(401).json({
                msg:'hable con el administrador'
            })
        }
         //generar token
         const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {  
        res.status(400).json({
            ok:false,
            msg:'el token de google no es valido'
        })
    }
   
}

module.exports = {
    login,
    googleSingIn
} 