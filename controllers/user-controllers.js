const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const User = require("../models/User");
const isEmpty = require("is-empty");

const getUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find({});

    if (isEmpty(users)) {
      return next(
        new HttpError("Fetching users failed, please try again!", 500)
      );
    }
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  res.json({ users });
};

const addNewUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data!", 422)
    );
  }
  const { name, email } = req.body;

  let existingUser;
  let newUser;

  try {
    existingUser = await User.findOne({ email: email });

    if (existingUser) {
      const error = new HttpError("User exists already!", 422);
      return next(error);
    }

    newUser = new User({
      name,
      email,
    });

    const saveUser = await newUser.save();
    if(isEmpty(saveUser)){
      return next(new HttpError('Saving user failed!', 500))
    }
  } catch (err) {
    const error = new HttpError(
      "Adding new user failed, please try again!",
      500
    );
    return next(error);
  }

  res.status(201).json({ name: newUser.name, email: newUser.email });
};

const updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data!", 422)
    );
  }

  const { name, email } = req.body;

  const userId = req.params.uid;

  let existingUser;

  try {
    existingUser = await User.findById(userId);
    if (isEmpty(existingUser)) {
      return next(new HttpError("Can not find the user!", 404));
    }

    existingUser.name = name;
    existingUser.email = email;

    const existingEmailUser = await User.findOne({ email: email });
    if(!isEmpty(existingEmailUser) && !existingEmailUser.equals(existingUser)){
      return next(new HttpError('User with the email exists already!', 422))
    }

    const saveUser = await existingUser.save();

    if(isEmpty(saveUser)){
      return next(new HttpError('Saving user failed!', 500))
    }

  } catch (err) {
    const error = new HttpError(
      err.message,
      500
    );
    return next(error);
  }

  res.status(200).json({ user: existingUser.toObject({ getters: true }) });
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    const deleteUser = await User.findByIdAndRemove(userId);
    if(isEmpty(deleteUser)){
      return next(new HttpError('Can not delete the user', 500));
    }
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }

  res.status(200).json("Deleted!");
};

exports.getUser = getUser;
exports.addNewUser = addNewUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
