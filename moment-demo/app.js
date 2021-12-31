const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const uploadRouter = require('./uploads-routes');

const app = express();

app.use(bodyParser.json());
app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use('/api', uploadRouter);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
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

  app.listen(3000, () => console.log('Server started on port 3000'));
