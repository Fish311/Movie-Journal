const express = require('express')
const movieRouter = express.Router()
const Movie = require('../models/Movie.js')


//Get all Movies
movieRouter.get("/", (req, res, next) => {
    Movie.find((err, movies) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(movies)
    })
})

// Get Movies by user id
movieRouter.get("/user", (req, res, next) => {
    Movie.find({ user: req.auth._id}, (err, movies) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(movies)
    })
})

//Add new Movie
movieRouter.post("/", (req, res, next) => {
    req.body.user = req.auth._id
    req.body.username = req.auth.username
    const newMovie = new Movie(req.body)
    newMovie.save((err, savedMovie) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedMovie)
    })
})

// Delete Movie
movieRouter.delete("/:movieId", (req, res, next) => {
    Movie.findOneAndDelete(
        { _id: req.params.movieId, user: req.auth._id },
        (err, deletedMovie) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully Deleted Movie titled: ${deletedMovie.title}`)
        }
    )
})

// Update Movie
movieRouter.put("/:movieId", (req, res, next) => {
    Movie.findOneAndUpdate(
        { _id: req.params.movieId, user: req.auth._id },
        req.body,
        { new: true },
        (err, updatedMovie) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedMovie)
        }
    )
})

//upvote

movieRouter.put('/upvote/:id', (req, res, next) => {
    Movie.findOneAndUpdate(
        {_id: req.params.id},
        {
            $addToSet: {likedUsers: req.auth._id},
            $pull: {dislikedUsers: req.auth._id}
        },
        {new: true},
        (err, updatedMovie) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedMovie)
        }
    )
})

//downvote

movieRouter.put('/downvote/:id', (req, res, next) => {
    Movie.findByIdAndUpdate(
        req.params.id,
        {
            $addToSet: {dislikedUsers: req.auth._id},
            $pull: {likedUsers: req.auth._id}
        },
        {new: true},
        (err, updatedMovie) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedMovie)
        }
    )
})

module.exports = movieRouter