const jwt = require('jsonwebtoken');

const HttpError = require('../models/Http-error');

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            throw new Error('Authentication failed');
        }
        const decodedToken = jwt.verify(token, 'supermotsecret'); //validation of the token
        req.userData = {userId: decodedToken.userId}; //adding data to the request
        next();
    } catch (err){
        const error = new HttpError('Authentication failed!', 403);
        return next(error);
    }
};


//headers automatically proposed by express.js
//Authorization: 'Bearer TOKEN'