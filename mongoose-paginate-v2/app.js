const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Example = require('./model/Product');

const app = express();

const DATABASE_NAME = "mongoose-pagination-v2-db";
const MONGO_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;
let db;
let user;

app.use(bodyParser.json());

const mySchema = new mongoose.Schema({});

mySchema.plugin(mongoosePaginate);

const productRoutes = require('./routes/product-routes');

app.use(productRoutes);


mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT || 3002);
  })
  .catch((err) => {
    console.log(err);
  });
