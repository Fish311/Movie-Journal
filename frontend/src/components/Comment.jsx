import CommentForm from './CommentForm'
import {useState} from "react"
import { useContext } from 'react'
import { UserContext } from '../context/UserProvider'
export default function Comment(props) {

    
    const {comment, deleteComment, user} = props
    const {editComment} = useContext(UserContext)
    const [toggleEdit, setToggleEdit] = useState(false)

    function handleToggle() {
        setToggleEdit(prevToggle => !prevToggle)
    }
    return (
        <>
                <p>{comment.text}</p>
                { user._id === comment.user && <>
                     
                        
                        {toggleEdit && <CommentForm
                                btnText="Save Edit"
                                submit={editComment}
                                id={comment._id}
                                handleToggle={handleToggle}
                        />}
                        
                        
                        <>
                            <button onClick={() => deleteComment(comment._id)}>Delete Comment</button>
                            <button onClick={() => setToggleEdit(prevToggle => !prevToggle)}>Edit</button>
                        </>
                    </>
                }
            </>
    )

}