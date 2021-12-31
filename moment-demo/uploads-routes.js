const express = require('express');

const fileUpload = require('./file-upload');
const router = express.Router();
const uploadController = require('./uploads-controller');

router.post('/uploads', fileUpload.single('image'), uploadController.uploads);

module.exports = router;