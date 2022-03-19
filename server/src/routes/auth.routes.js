const router = require('express').Router();
const { catchErrors } = require('../handlers/error.handlers');
const { login, register, loginWithGoogle } = require('../controllers/auth.controllers');


router.post('/login', catchErrors(login));
router.post('/register', catchErrors(register));
router.post('/google', catchErrors(loginWithGoogle));

module.exports = router