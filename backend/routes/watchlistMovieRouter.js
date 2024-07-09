const express = require('express')
const watchlistMovieRouter = express.Router()
const WatchlistMovie = require('../models/WatchlistMovie.js')

//Get all Watchlist Movies
watchlistMovieRouter.get("/", (req, res, next) => {
    WatchlistMovie.find((err, movies) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(movies)
    })
})

// Get watchlist Movies by user id
watchlistMovieRouter.get("/user", (req, res, next) => {
    WatchlistMovie.find({ user: req.auth._id}, (err, movies) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(movies)
    })
})

//Add new watchlist Movie
watchlistMovieRouter.post("/", (req, res, next) => {
    req.body.user = req.auth._id
    const newWatchlistMovie = new WatchlistMovie(req.body)
    newWatchlistMovie.save((err, savedMovie) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedMovie)
    })
})

// Delete watchlist Movie
watchlistMovieRouter.delete("/:watchlistMovieId", (req, res, next) => {
    WatchlistMovie.findOneAndDelete(
        { _id: req.params.watchlistMovieId, user: req.auth._id },
        (err, deletedMovie) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully Deleted Movie titled ${deletedMovie.title} from watchlist`)
        }
    )
})

// Update Watchlist Movie
watchlistMovieRouter.put("/:watchlistMovieId", (req, res, next) => {
    WatchlistMovie.findOneAndUpdate(
        { _id: req.params.watchlistMovieId, user: req.auth._id },
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

module.exports = watchlistMovieRouter