import React, { useEffect, useRef, useState } from 'react'
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
    const [ labelForm, setLabelForm ] = useState(false)
    const [ cardDescription, setCardDescription ] = useState(card.description || '')
    const [ comment, setComment ] = useState('')
    const ulRef = useRef()
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

    useEffect(() => {
        if (!showDescriptionForm) return;

        const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
            setShowDescriptionForm(false);
        }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showDescriptionForm]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(comment.length && comment.trim()) {
            await dispatch(createComment({description: comment, card_id: card.id}))
            await dispatch(getAllLists(list.board_id))
        }
    }

    const toggleLabelForm = () => {
        setLabelForm(!labelForm)
    }

    return (
        <div className='cardInfoContainer' onClick={(e) => e.stopPropagation()}>
            <div className='cardInfo fdc g1'>
                <div className='fdc'>
                    <span>{card.name}</span>
                    <span style={{"fontSize":"12px"}}> in list {list.name}</span>
                    {!!card.label.length && <div style={{"fontSize":"12px"}} className=''>
                        <span>Label</span>
                        <div className='fdr'>
                            {card.label.map(label => (
                                <div key={label.id} className={label.color + 'Background aic'}>
                                    <div className='labelInModal' style={{'backgroundColor': `${label.color}`}}></div>
                                </div>
                            ))}
                        </div>

                    </div>}
                </div>
                <div className='fdc'>
                    <span>Description</span>
                    {showDescriptionForm ? (
                        <textarea
                        onClick={(e) => e.target.select()}
                        type='text'
                        className='description inputForDescription cur'
                        value={cardDescription || ''}
                        autoFocus
                        onFocus={e => e.target.select()}
                        onBlur={handleBlur}
                        maxLength={100}
                        onChange={updateDescription}
                        onKeyDown={ async (event) => {
                            if(cardDescription.length && cardDescription.trim()) {
                                if (event.key === 'Enter') {
                                    setShowDescriptionForm(!showDescriptionForm)
                                    event.preventDefault()
                                    event.stopPropagation()
                                    await dispatch(updateCard({...card, description: cardDescription}))
                                    await dispatch(getAllLists(list.board_id))
                                }
                                if(event.key === 'Escape') {
                                    setCardDescription(card.description)
                                    setShowDescriptionForm(!showDescriptionForm)
                                }
                            }
                        }}
                        />
                    ) : (
                        <div onClick={() => setShowDescriptionForm(true)} className='description cur'>
                            {card.description ? <div style={{"overflow":"wrap"}}>{card.description}</div> : <span className='descriptionPlaceholder' style={{"fontSize":"12px"}}>Add a more detailed description...</span>}
                        </div>
                    )}
                </div>
                <div className='fdc'>
                    <span>Activity</span>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <input
                                onClick={(e) => e.target.select()}
                                type='text'
                                className=''
                                value={comment}
                                placeholder='Add comment...'
                                maxLength={200}
                                onChange={updateComment}
                                onKeyDown={ async (event) => {
                                    if(comment.length && comment.trim()) {
                                        if (event.key === 'Enter') {
                                            event.preventDefault()
                                            event.stopPropagation()
                                            await dispatch(createComment({description: comment, card_id: card.id})).then(() => {
                                                dispatch(getAllLists(list.board_id))
                                            }).then(() => {
                                                setComment('')
                                            })
                                        }
                                    }
                                }}
                            />
                        </form>
                    </div>
                    <Comments comments={cardComments} />
                </div>
            </div>
            <div className='cardOptions fdc g1'>
                Options
                <div className='addLabelToCard aic' onClick={toggleLabelForm}>
                    Add Label
                </div>
                {labelForm && (
                    <div className='labelForm fdc'>
                        <div className='cur' onClick={toggleLabelForm}>X</div>
                        <div>
                            <input type="checkbox" name="green" onChange={(e) => {
                                if(e.target.checked){
                                    console.log('submit')
                                } else {
                                    console.log("delete")
                                }
                            }
                            }/>
                            <label htmlFor="green">Green</label>
                        </div>
                        <div>
                            <input type="checkbox" name="red" />
                            <label htmlFor="scales">Red</label>
                        </div>
                        <div>
                            <input type="checkbox" name="red" />
                            <label htmlFor="scales">Blue</label>
                        </div>
                        <div>
                            <input type="checkbox" name="red" />
                            <label htmlFor="scales">Purple</label>
                        </div>
                        <div>
                            <input type="checkbox" name="red" />
                            <label htmlFor="scales">Orange</label>
                        </div>
                        <div>
                            <input type="checkbox" name="red" />
                            <label htmlFor="scales">Yellow</label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CardModal
