import React, { useState } from 'react'



export default function WatchlistForm(props) {

    const initInputs = {
        title: props.initTitle || "",
    }

    const [inputs, setInputs] = useState(initInputs)
    const { submit, watchlistMovieId, btnText } = props

    function handleChange (e) {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }
    function handleSubmit(e){
        e.preventDefault()
        submit(inputs, watchlistMovieId)
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
            
            <button>{btnText}</button>
        </form>
    )
}