const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Comment Blueprint
const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    username: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Comment", commentSchema)