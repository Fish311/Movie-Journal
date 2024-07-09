const mongoose = require('mongoose')
const Schema = mongoose.Schema

// watchlist movie Blueprint
const watchlistMovieSchema = new Schema({
   title: {
       type: String,
       required: true
   },
   user: {
       type: Schema.Types.ObjectId,
       ref: "User",
       required: true
   },
   createdAt: {
       type: Date,
       default: Date.now
   },
})

module.exports = mongoose.model("WatchlistMovie", watchlistMovieSchema)