const express = require('express');
const { check } = require('express-validator');

const authenControllers = require('../controllers/authentication-controllers');
const fileUpload = require('../middlewares/file-upload');

const router = express.Router();

router.post('/signup',
fileUpload.single('image'),
[
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
]

,authenControllers.signup);

router.post('/login', authenControllers.login);

router.get('/logout', authenControllers.logout);

module.exports = router;