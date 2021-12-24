const express = require('express');
const userControllers = require('../controllers/user-controllers');


const router = express.Router();

router.get('/', userControllers.getUser);

router.post('/add', userControllers.addNewUser);

router.patch('/update/:uid', userControllers.updateUser);

router.delete('/delete/:uid', userControllers.deleteUser);

module.exports = router;