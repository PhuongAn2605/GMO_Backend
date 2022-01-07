const HttpError = require('../models/http-error');
const constants = require('../utils/constants');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        return next()
    }

    try{
        const decodedToken = jwt.verify(token, constants.JWT_KEY);
        req.userData = { userId: decodedToken.userId };
        next();
    }catch(err){
        const error = new HttpError('Authentication failed!', 401);
        return next(error);
    }
}