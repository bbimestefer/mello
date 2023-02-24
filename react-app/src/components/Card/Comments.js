import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeComment } from '../../store/comment'
import './Comments.css'

function Comments({comments}) {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const handleDelete = async (commentId) => {
        await dispatch(removeComment(commentId))
    }
    return (
        <div className='commentsContainer fdc g1'>
            {Object.values(comments).map(comment =>{
                const today = new Date()
                const created = new Date(comment.created_at)
                let input
                const years = today.getFullYear() === created.getFullYear()
                const months = today.getMonth() === created.getMonth()
                const days = today.getDate() === created.getDate()
                const hours = today.getHours() === created.getHours()

                if(!years) {
                    input = created.getMonth() + ' ' + created.getFullYear()
                } else if (!months) {
                    input = created.getMonth() + ' ' + created.getDate()
                } else if (!days) {
                    const daysApart = today.getDate() - created.getDate()
                    if(daysApart > 1){
                        input = daysApart + ' days ago'
                    } else {
                        input = daysApart + ' day ago'
                    }
                } else if (!hours) {
                    const hoursApart = today.getHours() - created.getHours()
                    if(hoursApart > 1){
                        input = hoursApart + ' hours ago'
                    } else {
                        input = hoursApart + ' hour ago'
                    }
                } else {
                    const minutesApart = today.getMinutes() - created.getMinutes()
                    if(minutesApart === 0) {
                        input = '< 1 minute ago'
                    } else if(minutesApart > 1){
                        input = minutesApart + ' minutes ago'
                    } else {
                        input = minutesApart + ' minute ago'
                    }
                }
                return (
                    <div key={comment.id} className='commentInfo fdr g1'>
                        <div style={{"position":"relative", "top":"5px", "fontSize":"20px"}}>
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div className='fdc w100' style={{"overflowWrap":"anywhere", "gap":"0.3em"}}>
                            <div className='aic fdr g1'>
                                <span className='fwb'>{user.first_name} {user.last_name}</span>
                                <span style={{"color":"lightSlateGray"}} className='fs12'>{input}</span>
                            </div>
                            <div className='fs14 commentDes aic p1'>
                                {comment.description}
                            </div>
                            <div className='commentButtonsContainer fdr g1'>
                                {/* <div className='commentButton cur'>Edit</div>
                                <div>*</div> */}
                                <div onClick={() => handleDelete(comment.id)} className='commentButton cur'>Delete</div>
                            </div>
                        </div>
                    </div>
                )}
            )}
        </div>
    )
}

export default Comments
