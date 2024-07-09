import { useState, useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

export default function CommentContainer(props){

    const { movieId, userId } = props
    const {addComment} = useContext(UserContext)
    const [isHidden, setIsHidden] = useState(true)

    function toggleView(){
        setIsHidden(!isHidden)
    }

    return(
        <div>
            <CommentForm id = {movieId} btnText="Post Comment" submit={addComment}/>
            <button onClick={toggleView}>{isHidden ? 'Show Comments' : 'Hide Comments'}</button>
            {!isHidden && <CommentList movieId = {movieId} userId = {userId} btnText="Edit Comment" />}
        </div>
    )
}