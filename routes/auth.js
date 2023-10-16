const {Router} = require('express');
const { check } = require('express-validator');

const { login, googleSingIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();

router.post('/login',[
    check('correo', 'es obligatorio').isEmail(),
    check('password','es obligatorio').not().isEmpty(),
    validarCampos
],login)

router.post('/google',[
    check('id_token', 'Token es necesario').not().isEmpty(),
    validarCampos
],googleSingIn)


module.exports = router