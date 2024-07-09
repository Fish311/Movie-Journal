import React from 'react'
import WatchlistMovie from './WatchlistMovie'

export default function WatchlistList(props) {
    const { watchlistMovies } = props
    return(
        <div>
            { watchlistMovies.map(movie => <WatchlistMovie {...movie} key ={movie._id}/>)}
        </div>
    )
}