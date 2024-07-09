import React, { useState } from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props) {
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        movies: [],
        watchlistMovies: [],
        errMsg: ""
    }

    //States
    const [userState, setUserState] = useState(initState)
    const [allMovies, setAllMovies] = useState([])
    const [allComments, setAllComments] = useState([])
    const [allWatchlistMovies, setAllWatchlistMovies] = useState([])

    //signup function
    function signup(credentials) {
        axios.post("/api/auth/signup", credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
                
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    //login function
    function login(credentials) {
        axios.post("/api/auth/login", credentials)
            .then(res => {
                const { user, token } = res.data
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
                
            })
            .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    //logout function
    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: "",
            movies: [],
            watchlistMovies: []
        })
    }

    //Auth error functions
    function handleAuthErr(errMsg) {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    function resetAuthErr() {
        setUserState(prevState => ({
            ...prevState,
            errMsg: ""
        }))
    }

    // Get User Movies function
    function getUserMovies() {
        userAxios.get("/api/protected/movies/user")
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    movies: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    // Add Movie function
    function addMovie(newMovie) {
        userAxios.post("/api/protected/movies", newMovie)
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    movies: [...prevState.movies, res.data]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    // Get All Movies function
    function getAllMovies() {
        userAxios.get("/api/protected/movies")
            .then(res => setAllMovies(res.data))
            .catch(err => console.log(err))
    }

    // Edit Movie function
    function editMovie(inputs, movieId) {

        userAxios.put(`/api/protected/movies/${movieId}`, inputs)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    movies: prevUserState.movies.map(movie => {
                        if (movie._id !== movieId) {
                            return movie
                        }
                        else {
                            return res.data

                        }

                    })
                })
                )
                setAllMovies(prevMovies => prevMovies.map(movie => movie._id !== movieId ? movie : res.data))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    // Delete Movie function

    function deleteMovie(movieId) {
        userAxios.delete(`/api/protected/movies/${movieId}`)
            .then(setUserState(prevUserState => ({
                ...prevUserState,
                movies: prevUserState.movies.filter(movie => movie._id !== movieId)
            })
            ))
            .catch(err => console.log(err.response.data.errMsg))
    }

    // Upvote Movie function

    function upvoteMovie(movieId) {
        userAxios.put(`/api/protected/movies/upvote/${movieId}`)
            .then(res => {

                setAllMovies(prevMovies => prevMovies.map(movie => movie._id === movieId ? res.data : movie))
                setUserState(prevUserState => {
                    return {
                        ...prevUserState,
                        movies: prevUserState.movies.map(movie => movieId === movie._id ? res.data : movie)
                    }
                })
            })
            .catch(err => console.log(err))
    }

    // Downvote Movie function

    function downvoteMovie(movieId) {
        userAxios.put(`/api/protected/movies/downvote/${movieId}`)
            .then(res => {
                setAllMovies(prevMovies => prevMovies.map(movie => movie._id === movieId ? res.data : movie))
                setUserState(prevUserState => {
                    return {
                        ...prevUserState,
                        movies: prevUserState.movies.map(movie => movieId === movie._id ? res.data : movie)
                    }
                })
            })
            .catch(err => console.log(err))
    }

    // Get all comments function

    function getAllComments() {
        userAxios.get('/api/protected/comments')
            .then(res => setAllComments(res.data))
            .catch(err => console.log(err))
    }

    // add comment function

    function addComment(id, comment) {
        userAxios.post(`/api/protected/comments/${id}`, comment)
            .then(res => setAllComments(prevAllComments => {
                console.log(comment)
                return [
                    ...prevAllComments,
                    res.data
                ]
            }))
            .catch(err => console.log(err))
    }

    // Delete Comment function

    function deleteComment(commentId) {
        userAxios.delete(`/api/protected/comments/${commentId}`)
            .then(res => setAllComments(prevAllComments => prevAllComments.filter(comment => comment._id !== commentId)))
            .catch(err => console.log(err.response.data.errMsg))
    }

    // Edit Comment Function

    function editComment(commentId, inputs) {

        userAxios.put(`/api/protected/comments/${commentId}`, inputs)
            .then(res => setAllComments(prevAllComments => prevAllComments.map(comment => comment._id !== commentId ? comment : res.data)
            )
            )
            .catch(err => console.log(err.response.data.errMsg))
    }

    // Add Watchlist Movie function
    function addWatchlistMovie(newMovie) {
        userAxios.post("/api/protected/watchlistMovies", newMovie)
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    watchlistMovies: [...prevState.watchlistMovies, res.data]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    // Get watchlist movies function
    function getWatchlistMovies() {
        userAxios.get("/api/protected/watchlistMovies/user")
            .then(res => {
                setUserState(prevState => ({
                    ...prevState,
                    watchlistMovies: res.data
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    // Edit watchlist movie function
    function editWatchlistMovie(inputs, watchlistMovieId) {

        userAxios.put(`/api/protected/watchlistMovies/${watchlistMovieId}`, inputs)
            .then(res => {
                setUserState(prevUserState => ({
                    ...prevUserState,
                    watchlistMovies: prevUserState.watchlistMovies.map(movie => {
                        if (movie._id !== watchlistMovieId) {
                            return movie
                        }
                        else {
                            return res.data

                        }

                    })
                })
                )
                setAllWatchlistMovies(prevMovies => prevMovies.map(movie => movie._id !== watchlistMovieId ? movie : res.data))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    // Delete Watchlist Movie function
    function deleteWatchlistMovie(watchlistMovieId) {
        userAxios.delete(`/api/protected/watchlistMovies/${watchlistMovieId}`)
            .then(setUserState(prevUserState => ({
                ...prevUserState,
                watchlistMovies: prevUserState.watchlistMovies.filter(movie => movie._id !== watchlistMovieId)
            })
            ))
            .catch(err => console.log(err.response.data.errMsg))
    }

    return(
        <UserContext.Provider
            value={{
                ...userState,
                allMovies,
                allComments,
                allWatchlistMovies,
                signup,
                login,
                logout,
                resetAuthErr,
                handleAuthErr,
                getUserMovies,
                addMovie,
                getAllMovies,
                editMovie,
                deleteMovie,
                upvoteMovie,
                downvoteMovie,
                getAllComments,
                addComment,
                deleteComment,
                editComment,
                addWatchlistMovie,
                editWatchlistMovie,
                deleteWatchlistMovie,
                getWatchlistMovies
            }}>
            {props.children}
        </UserContext.Provider>
    )
}

    