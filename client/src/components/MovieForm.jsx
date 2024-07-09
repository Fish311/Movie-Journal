import React, { useState } from 'react'



export default function MovieForm(props) {

    const initInputs = {
        title: props.initTitle || "",
        description: props.initDescription || "",
        dateSeen: props.dateSeen || "",
        genre: props.genre || "",
        rating: props.rating || ""
    }

    const [inputs, setInputs] = useState(initInputs)
    const { submit, btnText, movieId, initTitle, initDescription } = props

    function handleChange (e) {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }
    function handleSubmit(e){
        e.preventDefault()
        submit(inputs, movieId)
        setInputs(initInputs)
    }

    const { title, description } = inputs

    return(
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="Title"/>
            <input
                type="number"
                name="rating"
                value={inputs.rating}
                onChange={handleChange}
                placeholder="What you rate the movie from 0-10"/>
            <input
                type="text"
                name="dateSeen"
                value={inputs.dateSeen}
                onChange={handleChange}
                placeholder="Date you saw the movie (Not Required)"/>
            <input
                type="text"
                name="genre"
                value={inputs.genre}
                onChange={handleChange}
                placeholder="Movie genre (Not Required)"/>
            <input
                type="text"
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Review"/>
            <button>{btnText}</button>
        </form>
    )
}