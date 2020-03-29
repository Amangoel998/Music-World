const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next){
    const token = req.header('x-auth-token');
    if (!token)
        res.status(401).json({msg: 'No token, authorization Denied'});
    try{
        const payload = jwt.verify(token, config.get('jwtKey'));
        req.user = payload.user
        next();
    }catch(err){
        res.status(401).json({ msg : 'Token not valid or expired' });
    }
}