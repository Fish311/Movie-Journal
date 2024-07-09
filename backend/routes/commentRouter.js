const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/Comment.js')

//Get comment request
commentRouter.get('/', (req, res, next) => {
    Comment.find((err, comment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comment)
    })
})

//Add new comment
commentRouter.post('/:movieId', (req, res, next) => {
    req.body.user = req.auth._id
    req.body.movie = req.params.movieId
    req.body.username = req.auth.username
    const newComment = new Comment(req.body)
    newComment.save((err, comment) => {
        if (err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(comment)
    })
})

// Delete Comment
commentRouter.delete("/:commentId", (req, res, next) => {
    Comment.findOneAndDelete(
        { _id: req.params.commentId, user: req.auth._id },
        (err, deletedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully Deleted Comment`)
        }
    )
})

// update Comment
commentRouter.put("/:commentId", async (req, res, next) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            req.body,
            {new: true}
        )
        return res.status(201).send(updatedComment)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

module.exports = commentRouter