import React from 'react'
import MovieList from './MovieList.jsx'
import Movie from './Movie'
import { useContext } from 'react'
import { UserContext } from '../context/UserProvider.jsx'
import { useEffect } from 'react'


export default function Public() {

    const { getAllMovies, allMovies, getAllComments } = useContext(UserContext)
    useEffect(() => {
        getAllMovies()
        getAllComments()
    }, [])

    return(
        <>
            <h1>Public Movie Review Page</h1>

            <h3>Upvote or downvote someone's review or share your opinion with a comment!</h3>

            <div>
                <MovieList 
                movies={allMovies}/>
            </div>
        </>
    )
}