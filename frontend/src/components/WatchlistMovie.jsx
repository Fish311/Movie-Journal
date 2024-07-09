import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import WatchlistForm from './WatchlistForm'
import moment from 'moment'

export default function WatchlistMovie(props) {
    const { editWatchlistMovie, user, deleteWatchlistMovie } = useContext(UserContext)
    const { title, _id, user: userId, createdAt } = props
    

    const [editToggle, setEditToggle] = useState(false)

    return(
        <>
            <h2>Movie Name: {title}</h2>
            <h1>Date Added: {moment(createdAt).format("MMM Do YY")}</h1>
            <div>
                {editToggle ?
                    <>
                        <WatchlistForm 
                            submit={editWatchlistMovie}
                            btnText="Submit Edit"
                            initTitle={title}
                            watchlistMovieId={_id}/>
                        <button onClick={() => setEditToggle(prevToggle => !prevToggle)}>Close</button>
                    </>
                    :
                    <>
                        <button onClick={() => setEditToggle(prevToggle => !prevToggle)}>Edit</button>
                        <button onClick={() => deleteWatchlistMovie(props._id)}>Delete</button>
                    </>
                }
            </div>
        </>
    )
}