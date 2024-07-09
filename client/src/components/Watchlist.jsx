import { useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import WatchlistForm from './WatchlistForm'
import WatchlistList from './WatchlistList'

export default function Watchlist() {

    const { user: { username }, addWatchlistMovie, getWatchlistMovies, watchlistMovies } = useContext(UserContext)
    useEffect(() => {
        getWatchlistMovies()
    },[])
    return (
        <>
            <h1>Welcome to your watchlist!</h1>
            <h3>Add a movie below to your watchlist so you don't forget.</h3>
            <WatchlistForm submit={addWatchlistMovie} btnText="Add to Watchlist"/>
            <h3>Your posted movies to watch:</h3>
            <WatchlistList watchlistMovies={watchlistMovies}/>
            
        </>
    )
}