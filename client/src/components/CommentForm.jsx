import { useState, useContext } from 'react'
import { UserContext } from '../context/UserProvider'

export default function CommentForm(props){
    
    const {addComment} = useContext(UserContext)

    const {id, btnText, submit, handleToggle} = props

    const [formData, setFormData] = useState({
        text: ''
    })

    function handleChange (e) {
        const {name, value} = e.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        submit(id, formData)
        !handleToggle && setFormData({text: ''})
        handleToggle && handleToggle()
    }

    return(
        <form onSubmit={handleSubmit}>
            <input
            placeholder="Comment"
            name='text'
            value={formData.text}
            onChange={handleChange} />
            <button>{btnText}</button>
        </form>
    )
}