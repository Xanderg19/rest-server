const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVETEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject(err); // Debes llamar a reject en caso de error
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT
};
