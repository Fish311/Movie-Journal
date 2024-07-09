import React from 'react'
import Movie from './Movie'

export default function MovieList(props) {
    const { movies } = props
    
    return(
        <div>
            { movies.map(movie => <Movie {...movie} key ={movie._id}/>)}
        </div>
    )
}