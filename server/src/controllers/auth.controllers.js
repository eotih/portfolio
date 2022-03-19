const bcrypt = require('bcryptjs');
const User = require('../models/user.models');
const { generateToken } = require('../services/token.services');
const { userValidate, loginValidate } = require('../helpers/validation.helpers');

class AuthController {
    async login(req, res, next) {
        const { email, password } = req.body;

        const { error } = loginValidate(req.body);
        if (error) throw error.details[0].message;

        const userExists = await User.findOne({ email });
        if (!userExists) throw "User not found";

        const isValidPassword = bcrypt.compareSync(password, userExists.password);
        if (!isValidPassword) throw "Invalid password";

        res.status(200).json({
            token: generateToken(userExists),
            message: 'Login successfully',
            status: 200
        });
    }
    async register(req, res, next) {
        const { name, email, password, mobile } = req.body;

        const { error } = userValidate(req.body);
        if (error) throw error.details[0].message;

        const userExists = await User.findOne({ email });
        if (userExists) throw "Email này đã tồn tại.";

        const newUser = new User({
            name,
            email,
            password: bcrypt.hashSync(password, 8),
            mobile
        });
        const createdUser = await newUser.save();
        res.status(200).json({
            token: generateToken(createdUser),
            message: 'User created successfully!',
        });
    }

    async loginWithGoogle(req, res, next) {
        const { email, name, imageUrl, googleId } = req.body;
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            if (!userExists.googleId || !userExists.image) {
                userExists.googleId = googleId;
                userExists.image = imageUrl;
                await userExists.save();
            }
            res.status(200).json({
                token: generateToken(userExists),
                message: 'Login successfully',
                status: 200
            });
        } else {
            const newUser = new User({
                name,
                email,
                imageUrl,
                googleId
            });
            const createdUser = await newUser.save();
            res.status(200).json({
                token: generateToken(createdUser),
                message: 'Login successfully',
                status: 200
            });
        }

    }
}

module.exports = new AuthController();