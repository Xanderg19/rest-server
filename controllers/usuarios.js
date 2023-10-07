const{response,request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');



const usuarioGet = async(req = request,res=response) =>{
    // const {q,nombre = 'no nombre',apikey,page = "1",limit} = req.query;
    const {limite=5, desde = 0 } = req.query;
    const query = {estado:true};

    const [total,usuarios] = await promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number( desde ))
        .limit(Number( limite ))
    ]);
    res.json({
       total,
       usuarios
    });
}
 
const usuarioPost = async(req,res=response) =>{
    

    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});

    //verificar si el correo exist
    
    //Encriptar el password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt)
    //guardar db
    await usuario.save();

    res.json({
        usuario
    });
}

const usuarioPut = async(req,res=response) =>{
    const id = req.params.id;
    const {_id,password,google,correo,...resto } = req.body;

    //TODO validar contra base de datos
    if(password){
        const salt = bcryptjs.genSaltSync();
       resto.password = bcryptjs.hashSync(password,salt)
    }
    const usuario = await Usuario.findByIdAndUpdate( id,resto );
    res.json({
        
        msg:'Put API - controlador',
        usuario
    });
}





const usuarioPatch =(req,res=response) =>{
    res.json({
        
        msg:'Patch API - controlador'
    });
}

const usuarioDelete = async(req,res=response) =>{

    const {id} = req.params;
    //bisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})

    res.json({
        usuario
    });
}
module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPatch,
    usuarioDelete,
    usuarioPut
}