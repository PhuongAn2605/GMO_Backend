const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRouter = require('./routes/user-routes');
const HttpError = require('./models/http-error');

const DATABASE_NAME = 'mern';
const MONGO_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;

const app = express();

let db;
let user;

app.use(bodyParser.json());

app.use('/api/users', userRouter);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error;
})

mongoose.connect(MONGO_URL).then(() => {
    app.listen(process.env.PORT || 3001);
}).then(() => {

}).catch((err) => {
    console.log(err);
});