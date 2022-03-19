const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
    try {
        const authorization = req.headers['x-access-token'] || req.headers['authorization'];
        if (!authorization) throw "Unauthorized";
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
        jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret', (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Invalid token',
                });
            }
            req.user = decoded;
            next();
        });
    } catch (err) {
        res.status(401).json({
            message: "Forbidden 🚫🚫🚫",
        });
    }
};
const isAdmin = async (req, res, next) => {
    try {
        if (!req.user && !req.user.role === 'admin') throw "Access Denied!!";
        next();
    }
    catch (err) {
        res.status(401).json({
            message: "Access Denied 🚫🚫🚫",
        });
    }
};

module.exports = { isAdmin, isAuthenticated };