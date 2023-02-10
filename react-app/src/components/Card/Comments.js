import React from 'react'
import { useDispatch } from 'react-redux'
import { removeComment } from '../../store/comment'
import './Comments.css'

function Comments({comments}) {
    const dispatch = useDispatch()
    const handleDelete = async (commentId) => {
        await dispatch(removeComment(commentId))
    }
    return (
        <div className='commentsContainer fdc g1'>
            {Object.values(comments).map(comment => (
                <div key={comment.id} className='commentInfo fdr g1'>
                    <div className='aic'>
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <div>
                            {comment.description}
                        <div className='commentButtonsContainer fdr g1'>
                            <div className='commentButton cur'>Edit</div>
                            <div>*</div>
                            <div onClick={() => handleDelete(comment.id)} className='commentButton cur'>Delete</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Comments
