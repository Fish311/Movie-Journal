const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Movie Blueprint
const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateSeen: {
        type: String
    },
    genre: {
        type: String
    },
    rating: {
        type: Number,
        min: 0,
        max: 10
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
    likedUsers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    dislikedUsers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    username: {
        type: String
    }
})

module.exports = mongoose.model("Movie", movieSchema)