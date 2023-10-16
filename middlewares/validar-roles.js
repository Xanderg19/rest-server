const { response } = require("express");
const role = require("../models/role");

const esAdminRole = (req, res, next) => { // Agrega req, res y next como argumentos

    if (!req.usuario) {
       return res.status(500).json({
            msg: 'se quiere verificar el role sin validar el token primero'
       });
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no tiene permiso de administrador`
        });
    }

    next();
}

const tieneRole = (...roles) => {
    return (req, res, next) => { // Agrega req, res y next como argumentos

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'se quiere verificar el role sin validar el token primero'
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `el servicio requiere uno de estos roles ${role}`
            });
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}
