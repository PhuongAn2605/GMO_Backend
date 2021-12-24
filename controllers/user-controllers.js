const HttpError = require("../models/http-error");
const { update } = require("../models/User");
const User =  require("../models/User");

const getUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again!",
      500
    );
    return next(error);
  }

  res.json({ users });
};

const addNewUser = async (req, res, next) => {
  const { name, email } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Adding new user failed, please try again!", 500);
    return next(error);
  }

  if(existingUser){
      const error = new HttpError('User exists already!', 422);
      return next(error);
  }

  const newUser = new User({
      name, email
  });

  try{
      await newUser.save();
  }catch(err){
      const error = new HttpError('Saving user failed!', 500);
      return next(error);
  }

  res.status(201).json({ name: newUser.name, email: newUser.email })
};

const updateUser = async (req, res, next) => {

    const { name, email } = req.body;

    const userId = req.params.uid;
    console.log(userId)

    let existingUser;

    try{
        existingUser = await User.findById(userId);
    }catch(err){
        const error = new HttpError('Something went wrong, could not update then user!', 500);
        return next(error);
    }

    existingUser.name = name;
    existingUser.email = email;

    try{
        await existingUser.save();
    }catch(err){
        const error = new HttpError('Something went wrong, could not update then user!', 500);
        return next(error);
    }

    res.status(200).json({ user: existingUser.toObject({ getters: true })})

}

const deleteUser = async (req, res, next) => {
    const userId = req.params.uid;

    let user;
    try{
        await User.findByIdAndRemove(userId);
    }catch(err){
        const error = new HttpError('Can not delete the user', 500);
        return next(error);
    }

    res.status(200).json('Deleted!')
}

exports.getUser = getUser;
exports.addNewUser = addNewUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;