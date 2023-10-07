const {Router} = require('express');
const { usuarioGet, usuarioPut, usuarioPost, usuarioDelete, usuarioPatch } = require('../controllers/usuarios');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validator');

const router = Router();
    router.get('/',usuarioGet)

    router.put('/:id',[
        check('id','No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom(esRolValido),   
        validarCampos
    ],
    usuarioPut)


    router.post('/',[
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password','El password debe de ser mas de 6 letras').isLength({min:6}),
        check('correo').custom(emailExiste),
        // check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('rol').custom(esRolValido),
        validarCampos
    ],usuarioPost)


    router.delete('/:id',[
        check('id','No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
    ],usuarioDelete)

    router.patch('/',usuarioPatch)

module.exports = router;