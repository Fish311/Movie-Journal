import React, { useContext } from 'react'
import MovieForm from './MovieForm.jsx'
import Movie from './Movie.jsx'
import { UserContext } from '../context/UserProvider'
import MovieList from './MovieList.jsx'
import { useEffect } from 'react'


export default function Profile() {

    const { user: { username }, addMovie, movies, getUserMovies, getAllComments } = useContext(UserContext)
    useEffect(() => {
        getUserMovies()
        getAllComments()
    }, [])

    return(
        <>
            <h1>Welcome to your profile {username}</h1>

            <h3>Add a movie review below</h3>
            <MovieForm submit={addMovie} btnText="Add Movie" />
            <h3>Your posted movie reviews</h3>
            <MovieList movies={movies}/>
        </>
    )
}