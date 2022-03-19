const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const { _id, name, email, isAdmin, image } = user;
    return jwt.sign(
        {
            _id: _id,
            name: name,
            email: email,
            isAdmin: isAdmin,
            image: image,
        },
        process.env.JWT_SECRET || 'somethingsecret',
        {
            expiresIn: '30d',
        }
    );
}
module.exports = { generateToken };