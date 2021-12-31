const express = require('express');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRouter = require('./routes/user-routes');
const authenRouter = require('./routes/authentication-routes');
const HttpError = require('./models/http-error');

const DATABASE_NAME = 'mern';
const MONGO_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;

const app = express();
app.use(cookieParser());

let db;
let user;

app.use(bodyParser.json());
app.use("/uploads/images", express.static(path.join("uploads", "images")));


app.use('/api', authenRouter);

app.use('/api/users', userRouter);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        console.log(err);
      });
    }
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occurred!" });
  });

mongoose.connect(MONGO_URL).then(() => {
    app.listen(process.env.PORT || 3001);
}).then(() => {

}).catch((err) => {
    console.log(err);
});