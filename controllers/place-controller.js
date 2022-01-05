const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const isEmpty = require("is-empty");
const fs = require('fs');

const { title } = require('process');
const HttpError = require('../models/http-error');
const Place = require('../models/Place');
const User = require('../models/User');


const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try{
        place = await Place.findById(placeId);
        if(isEmpty(place)) {
            return next(new HttpError('Could not find the place with provided id', 404));
        }

    }catch(err){
        const error = new HttpError('Something went wrong, could not find the place.', 500);
        return next(error);
    }

    res.json({ place: place.toObject({ getters: true })});
    
}

const getPlaceByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let userWithPlaces;
    try{
        userWithPlaces = await User.findById(userId).populate('places');
        if(isEmpty(userWithPlaces)){
            return next(new HttpError('Could not find the user for the provided user id', 404));
        }

    }catch(err){
        return next(new HttpError('Something went wrong', 500));
    }

    res.json({
        places: userWithPlaces.places.map(place => place.toObject({ getters: true }))
    })
}

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
        user = await User.findById(userId);
        if(!user){
            return next(new HttpError('Could not find the user for provided id.', 404));
        }

        const savePlace = await createdPlace.save();
        if(isEmpty(savePlace)){
            return next(new HttpError('Can not save the place', 500));
        }
        user.places.push(createdPlace);
        const saveUser = await user.save();
        if(isEmpty(saveUser)){
            return next(new HttpError('Can not save the user', 500));
        }

        // const sess = await mongoose.startSession();
        // sess.startTransaction();

        // await createdPlace.save({ session: sess });
        // user.places.push(createdPlace);
        
        // await user.save({ session: sess });
        // await sess.commitTransaction();
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

const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;
    // console.log(placeId);

    let place;
    try{
        place = await Place.findById(placeId).populate('creator');
        if(isEmpty(place)){
            return next(new HttpError('Could not find the placce'));
        }

        const imagePath = place.image;
        console.log(imagePath)

        const removePlace = await place.remove();
        if(isEmpty(removePlace)){
            return next(new HttpError('Could not remove the place', 500));

        }

        place.creator.places.pull(place);
        const savePlace = await place.creator.save();
        if(isEmpty(savePlace)){
            return next(new HttpError('Could not save the place', 500));
        }

        // const sess = await mongoose.startSession();
        // sess.startTransaction();
        // console.log('started transaction')
        // await place.remove({ session: sess });
        // console.log('removed')
        // place.creator.pull(place);
        // await place.creator.save({ session: sess });
        // await sess.commitTransaction();

        try{
            fs.unlink(imagePath, err => {
                console.log(err);
            })
        }catch(err){
            console.log(err);
        }


    }catch(err){
        const error = new HttpError('Something went wrong, could not delete place.', 500);
        return next(error);
    }

    res.status(200).json({ message: 'Deleted place.'});

}

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;