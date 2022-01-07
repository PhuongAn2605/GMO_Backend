const express = require('express');
const { check } = require('express-validator');
const userControllers = require('../controllers/user-controllers');


const router = express.Router();

router.get('/', userControllers.getUser);

router.post('/add', 
[
    check("name").not().isEmpty(),
    check("email").isEmail()
],
userControllers.addNewUser);

router.patch('/update/:uid', [
    check('name').not().isEmpty(),
    check('email').isEmail()
], userControllers.updateUser);

router.delete('/delete/:uid', userControllers.deleteUser);

module.exports = router;