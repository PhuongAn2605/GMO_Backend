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
    // console.log(createdPlace);

    let user;
    try{
        user = await User.findById(userId);
        if(!user){
            return next(new HttpError('Could not find the user for provided id.', 404));
        }

        const sess = await mongoose.startSession();
        sess.startTransaction();
        console.log('started session')

        await createdPlace.save();
        console.log('saved place')
        user.places.push(createdPlace);
        console.log(user);
        
        await user.save();
        await sess.commitTransaction();
    }catch(err){
        return next(new HttpError('Creating place failed, please try again!', 500));
    }
    res.status(201).json({ place: createdPlace })
}

const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;

    let place;
    try{
        place = await Place.findById(placeId);
        console.log(place)
        if(isEmpty(place)){
            return next(new HttpError('Can not find the place!', 404));
        }
        place.title = title;
        place.description = description;

        const savePlace = await place.save();
        if(isEmpty(savePlace)){
            return next(new HttpError('Can not save the place', 500));
        }
    }catch(err){
        return next(new HttpError('Something went wrong, could not update place', 500));
    }

    res.status(200).json({ place: place.toObject({ getters: true })})
}

exports.createPlace = createPlace;
exports.updatePlace = updatePlace;