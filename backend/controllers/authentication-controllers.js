const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const isEmpty = require("is-empty");
const HttpError = require("../models/http-error");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const constants = require("../utils/constants");

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  // console.log(req.file);
  if (!errors.isEmpty()) {
    console.log(errors);

    return next(
      new HttpError("Invalid inputs passed, please check your data!", 422)
    );
  }

  const { name, email, password } = req.body;

  let existingUser;
  let token;
  let createdUser;

  let hashedPassword;

  try {
    existingUser = await User.findOne({ email: email });
    if (!isEmpty(existingUser)) {
      return next(
        new HttpError("User exists already, please login instead!", 422)
      );
    }

    hashedPassword = await bcrypt.hash(password, 12);
    if (isEmpty(hashedPassword)) {
      return next(new HttpError("Can not encrypt the password!", 422));
    }

    createdUser = new User({
      name,
      email,
      password: hashedPassword,
      // image: req.file.path
    });

    const saveUser = await createdUser.save();
    if (isEmpty(saveUser)) {
      return next(new HttpError("Can not save the user!", 500));
    }
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
    if (isEmpty(token)) {
      return next(new HttpError("Could not set token", 500));
    }
  } catch (err) {
    console.log(err);
    return next(new HttpError("Signing up failed, please try again!", 500));
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  let isValidPassword = false;
  let token;

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data!", 422)
    );
  }

  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    if (isEmpty(existingUser)) {
      return next(
        new HttpError("Not found the user, could not log you in!", 403)
      );
    }

    isValidPassword = await bcrypt.compare(password, existingUser.password);

    if (!isValidPassword) {
      return next(
        new HttpError("Invalid credentials, could not log you in!", 403)
      );
    }

    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      constants.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check credentials and try again!",
      500
    );
    return next(error);
  }

  res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({
      userId: existingUser.id,
      email: existingUser.email,
      token: token,
    });
};

const logout = async (req, res, next) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out!" });
};

exports.signup = signup;
exports.login = login;
exports.logout = logout;
