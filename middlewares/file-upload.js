const multer = require('multer');
const uuid = require('uuid/v1');

const IMAGE_TEST = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const fileUpload = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, res, cb) => {
            cb(null, 'uploads/images');
        },
        filename: (req, file, cb) => {
            const ext = IMAGE_TEST[file.mimetype];
            cb(null, uuid() + '.' + ext);
        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!IMAGE_TEST[file.mimetype];
        let error = isValid ? null : new Error('Inalid mine type!');
        cb(error, isValid);
    }
});

module.exports = fileUpload;