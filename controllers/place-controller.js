const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { title } = require('process');
const HttpError = require('../models/http-error');
const Place = require('../models/Place');
const User = require('../models/User');

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(
            new HttpError('Invalid inputs passed, please check your data!', 422)
        );
    }

    const { title, description, userId } = req.body;

    const createdPlace = new Place({
        title,
        description,
        image: req.file.path,
        creator: userId
    });

    let user;
    try{
        user = await User.findById(req.userData.userId);
        if(!user){
            return next(new HttpError('Could not find the user for provided id.', 404));
        }

        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({ session: sess });
        user.place.push(createdPlace);
        await user.save({ session: sess });
        await sess.commitTransaction();
    }catch(err){
        return next(new HttpError('Creating place failed, please try again!', 500));
    }
    res.status(201).json({ place: createdPlace })
}

exports.createPlace = createPlace;