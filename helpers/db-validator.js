const Role = require('../models/role');
const Usuario = require('../models/usuario');
const esRolValido =  async(rol = '') => {
    const existeRol = await Role.findOne({rol});

    if (!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la db`)
    }

}

const emailExiste = async(correo ='')=>{
    const existeEmail = await Usuario.findOne({correo});
    if( existeEmail ){ 
        throw new Error(`ese correo: ${correo}, ya esra registrado`)
    }
}
const existeUsuarioPorId = async(id)=>{

    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario ){ 
        throw new Error(`El id no existe: ${id}, ya esra registrado`)
    }
}
module.exports ={
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}