import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCardById, updateCard } from '../../store/card'
import { createComment, getAllComments } from '../../store/comment'
import { getAllLists } from '../../store/list'
import './CardModal.css'
import Comments from './Comments'

function CardModal(card) {
    const dispatch = useDispatch()
    const list = useSelector(state => state.lists.boardLists[card.list_id])
    const cardComments = useSelector(state => state.comments.comments)
    const [ showDescriptionForm, setShowDescriptionForm ] = useState(false)
    const [ cardDescription, setCardDescription ] = useState(card.description || '')
    const [ comment, setComment ] = useState('')
    // const cardState = useSelector(state => state.cards.singleCard)


    const handleBlur = () => {
        setCardDescription(card.description)
        setShowDescriptionForm(!showDescriptionForm)
    }

    const updateDescription = (e) => setCardDescription(e.target.value)
    const updateComment = (e) => setComment(e.target.value)

    useEffect(() => {
        dispatch(getCardById(card.id))
        dispatch(getAllComments(card.id))
    }, [dispatch, card.id])


    return (
        <div className='cardInfoContainer' onClick={(e) => e.stopPropagation()}>
            <div className='cardInfo fdc'>
                <span>{card.name}</span>
                <span style={{"fontSize":"12px"}}> in list {list.name}</span>
                <div className='fdc'>
                    <span>Description</span>
                    {showDescriptionForm ? (
                        <textarea
                        onClick={(e) => e.target.select()}
                        type='text'
                        className='description inputForDescription'
                        value={cardDescription || ''}
                        autoFocus
                        onFocus={e => e.target.select()}
                        onBlur={handleBlur}
                        maxLength={100}
                        onChange={updateDescription}
                        onKeyDown={ async (event) => {
                            if (event.key === 'Enter') {
                                setShowDescriptionForm(!showDescriptionForm)
                                event.preventDefault()
                                event.stopPropagation()
                                await dispatch(updateCard({...card, description: cardDescription}))
                                await dispatch(getAllLists(card.list_id))
                            }
                            if(event.key === 'Escape') {
                                setCardDescription(card.description)
                                setShowDescriptionForm(!showDescriptionForm)
                            }
                        }}
                        />
                    ) : (
                        <div onClick={() => setShowDescriptionForm(true)} className='description'>
                            {card.description ? <div style={{"overflow":"wrap"}}>{card.description}</div> : <span className='descriptionPlaceholder' style={{"fontSize":"12px"}}>Add a more detailed description...</span>}
                        </div>
                    )}
                </div>
                <div className='fdc'>
                    <span>Activity</span>
                    <div>
                        <input
                            onClick={(e) => e.target.select()}
                            type='text'
                            className=''
                            value={comment}
                            placeholder='Add comment...'
                            maxLength={200}
                            onChange={updateComment}
                            onKeyDown={ async (event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault()
                                    event.stopPropagation()
                                    await dispatch(createComment({description: comment, card_id: card.id}))
                                    await dispatch(getAllLists(card.list_id))
                                    setComment('')
                                }
                            }}
                        />
                    </div>
                    <Comments comments={cardComments} />
                </div>
            </div>
            <div className='cardOptions fdc'>
                Options
                <div>
                    Coming Soon!
                </div>
            </div>
        </div>
    )
}

export default CardModal
