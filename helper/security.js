require('dotenv').config();

const bcrypt = require('bcryptjs');
const crypto = require('crypto-js');
const jwt    = require('jsonwebtoken');
const {
    AuthorizationError
}            = require('./errorHandler'); 


const genBcrypt = async (saltLength, plainText) => {
    try{
        let salt = await bcrypt.genSalt(saltLength);
        let hash = await bcrypt.hash(plainText, salt);
        return hash;
    }
    catch(err) {
        console.log(err);
        return false;
    }
}

const compareBcrypt = async (plainText, hash) => {
    try {
        let result = await bcrypt.compare(plainText, hash);
        return result;
    }
    catch(err) {
        // console.log(err);
        return false;
    }
}

const encryptAes = async (plainText, urlSafe = false) => {
    let aesKey = 'uDksiapWqiIeiZks';
    let aesIv = 'PoIyBFgsXAqLUHjV';
    let key = crypto.enc.Utf8.parse(aesKey);
    let iv = crypto.enc.Utf8.parse(aesIv);
    try {
        let chiperText = crypto.AES.encrypt(plainText, key, {iv:iv});
        let base64 = chiperText.toString();

        if (urlSafe){
            base64 = base64.replace(/\+/g, '-');
            base64 = base64.replace(/\//g, '_');
        }

        return base64;
    }
    catch(err) {
        console.log(err);
        return false;
    }
}

const decryptAes = async (chiperText, urlSafe = false) => {
    let aesKey = 'uDksiapWqiIeiZks';
    let aesIv = 'PoIyBFgsXAqLUHjV';
    let key = crypto.enc.Utf8.parse(aesKey);
    let iv = crypto.enc.Utf8.parse(aesIv);

    try {
        if (urlSafe) {
            chiperText = chiperText.replace(/\-/g, '+');
            chiperText = chiperText.replace(/\_/g, '/');
        }

        let plainText = crypto.AES.decrypt(chiperText, key, {iv:iv});
        
        return plainText.toString(crypto.enc.Utf8);
    }
    catch(err) {
        // console.log(err);
        return false;
    }
}

const md5 = (plainText) => {
    let hash = crypto.MD5(plainText);

    return hash.toString();
}

const genJwt = async (payload, expiresIn) => {
    let secret  = 'pzUeYrtlKsDxqsda'
    let token   = jwt.sign(payload, secret, {expiresIn});

    return token;
}

const verifyAuthenticatedJwt = async (req, res, next) => {
    let secret        = 'pzUeYrtlKsDxqsda'
    let authorization = req.header('Authorization');

    if (!authorization) {
        next(new AuthorizationError('Unauthorized, Token not provide on request', 107));
    }
    else {
        let token = authorization.split(" ")[1];

        try {
            let verify  = jwt.verify(token, secret);
            verify      = JSON.parse(await decryptAes(verify.data, true));

            if (verify) {
                if (verify.authenticated == true) {
                    req.jwt_payload = verify;
                    next();
                }
                else {
                    next(new AuthorizationError('Unauthorized, Token cannot perform this action', 107));
                }
            }
            else {
                return next(new AuthorizationError('Token Invalid or Expired', 108));
            }
        }
        catch(err) {
            return next(new AuthorizationError('Token Invalid or Expired', 108));
        }
    }
}

module.exports = {
    genBcrypt,
    compareBcrypt,
    encryptAes,
    decryptAes,
    genJwt,
    verifyAuthenticatedJwt,
    md5
}