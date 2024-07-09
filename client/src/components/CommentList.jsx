import { useState } from 'react'
import { useContext } from 'react'
import {UserContext} from "../context/UserProvider"
import Comment from './Comment'
import CommentForm from './CommentForm'

export default function CommentList(props){
    const { movieId, userId, btnText } = props
    
    const {allComments, user, deleteComment} = useContext(UserContext)
    const filteredComments = allComments.filter(comment => comment.movie === movieId)
    const commentElements = filteredComments.map(comment => {
        return (
            <Comment 
                comment={comment}
                deleteComment={deleteComment}
                user={user}
            />
        )
    })
    return(
        <div>
            {commentElements}
        </div>
    )
}