import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import MovieForm from './MovieForm'
import CommentContainer from './CommentContainer'
export default function Movie(props) {
    const { allComments, user, deleteMovie, editMovie, upvoteMovie, downvoteMovie } = useContext(UserContext)
    const { title, description, _id, user: userId, likedUsers, dislikedUsers, username } = props

    const [movieToggle, setMovieToggle] = useState(false)
    return (
        <div>
            <h1>Title: {title}</h1>
            <h3>Genre: {props.genre}</h3>
            <h3>Date Seen: {props.dateSeen}</h3>
            <h3>Rating: {props.rating}</h3>
            <h3>Review: {description}</h3>
            {username && 
                <h3>Posted by: {username}</h3>}
            <div>
                <p>Upvotes: {likedUsers.length}</p>
                <button onClick={() =>upvoteMovie(_id)}>Upvote</button>
            </div>
            <div>
                <p>Downvotes: {dislikedUsers.length}</p>
                <button onClick={() =>downvoteMovie(_id)}>Downvote</button>
            </div>
            { user._id === userId &&
                <div>
                    {movieToggle ? 
                        <>
                        <MovieForm
                        submit={editMovie}
                        btnText="Submit Edit"
                        movieId={_id}
                        initTitle={title}
                        initDescription={description}
                        genre={props.genre}
                        rating={props.rating}
                        dateSeen={props.dateSeen} />
                        
                        <button onClick={() => setMovieToggle(prevToggle => !prevToggle)}>Close</button>
                        </>
                        :
                        <>
                        <button onClick={() => setMovieToggle(prevToggle => !prevToggle)}>Edit</button>
                        <button onClick={() => deleteMovie(props._id)}>Delete</button>
                        </>
                    }
                </div>
            }
            <CommentContainer movieId = {_id} userId = {userId} />
        </div>
    )
}