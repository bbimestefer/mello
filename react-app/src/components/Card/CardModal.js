import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux'
import { getCardById, updateCard } from '../../store/card'
import { createComment, getAllComments } from '../../store/comment'
import { createLabelForCard, deleteLabelForCard, getAllLabels } from '../../store/label'
import { getAllLists } from '../../store/list'
import './CardModal.css'
import Comments from './Comments'

function CardModal(card) {
    const dispatch = useDispatch()
    const list = useSelector(state => state.lists.boardLists[card.list_id])
    const labels = useSelector(state => state.labels.labels)
    const cardComments = useSelector(state => state.comments.comments)
    const [ showDescriptionForm, setShowDescriptionForm ] = useState(false)
    const [ labelForm, setLabelForm ] = useState(false)
    const [ cardDescription, setCardDescription ] = useState(card.description || '')
    const [ comment, setComment ] = useState('')
    const [ regExDesCheck, setRegCheck ] = useState(false)

    useEffect(() => {
        if(cardDescription) setRegCheck(cardDescription.replace(/<(.|\n)*?>/g, '').trim().length !== 0)
    }, [cardDescription])

    const handleBlur = () => {
        setCardDescription(card.description || null)
        setShowDescriptionForm(!showDescriptionForm)
    }

    const updateComment = (e) => setComment(e.target.value)

    useEffect(() => {
        dispatch(getCardById(card.id))
        dispatch(getAllComments(card.id))
        dispatch(getAllLabels())
    }, [dispatch, card.id])

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

    const checkDescription = async (event) => {
        if(cardDescription && regExDesCheck) {
            if(cardDescription && cardDescription.length && cardDescription.trim()) {
                    setShowDescriptionForm(!showDescriptionForm)
                    await dispatch(updateCard({...card, description: cardDescription}))
                    await dispatch(getAllLists(list.board_id))
            }
        }
    }

    const deleteDescription = async () => {
        setShowDescriptionForm(!showDescriptionForm)
        await dispatch(updateCard({...card, description: ''}))
        await dispatch(getAllLists(list.board_id))
        setCardDescription('')
    }

    const handleInputCheck = async (labelId, cardId, checked) => {
        if(checked) await dispatch(createLabelForCard(labelId, cardId))
        else await dispatch(deleteLabelForCard(labelId, cardId))

        await dispatch(getAllLists(list.board_id))
        await dispatch(getAllLabels())
    }

    return (
        <div className='cardInfoContainer' onClick={(e) => e.stopPropagation()}>
            <div className='cardInfo fdc g1'>

                <div className='fdc' style={{"display":"flex", "gap":"0.5em"}}>
                    <span className='fs20 fwb aic g1'><i className="fa-regular fa-file-lines"></i>{card.name}</span>
                    <div className='g1 fdc' style={{"marginLeft":"2.2em"}}>
                        <span style={{"fontSize":"16px"}}> in list <span style={{"textDecoration":"underline"}}>{list.name}</span></span>
                        {!!card.label.length && <div style={{"fontSize":"16px"}} className=''>
                            <span>Label</span>
                            <div className='fdr g1'>
                                {card.label.map(label => (
                                    <div key={label.id} className={label.color + 'Background aic cur'} onClick={toggleLabelForm}>
                                        <div className={'labelInModal ' + label.color + 'LabelColor'} ></div>
                                    </div>
                                ))}
                            </div>

                        </div>}
                    </div>
                </div>
                <div className='fdc fs20'>
                    <span className='g1 aic'><i className="fa-solid fa-grip-lines"></i>Description</span>
                    {showDescriptionForm ? (
                        <div className='quillContainer'>
                            <ReactQuill
                                value={cardDescription}
                                onChange={setCardDescription}
                                autoFocus
                                onBlur={handleBlur}
                                maxLength={100}
                                onKeyDown={ async (event) => {
                                    if(event.key === 'Escape') setShowDescriptionForm(!showDescriptionForm)
                                }}
                            />
                            <div className='fdr aic jcsb' style={{"marginTop":"0.5em"}}>
                                <div className='g1'>
                                    <button className={regExDesCheck ? 'boardSubmit desSave' : 'desSave boardSubmitOff'} onClick={() => checkDescription('Enter')}>Save</button>
                                    <button className='cancelDes' onClick={handleBlur}>Cancel</button>
                                </div>
                                <div>
                                    {regExDesCheck ? <div className='trashDescription cur aic jcc' onClick={deleteDescription}><i className="fa-regular fa-trash-can"></i></div>
                                    :
                                    <div className='trashDescriptionOff cur aic jcc'><i className="fa-regular fa-trash-can"></i></div>}
                                </div>
                            </div>

                        </div>
                        // <textarea
                        // style={{"marginLeft":"2.5em"}}
                        // onClick={(e) => e.target.select()}
                        // type='text'
                        // className='description inputForDescription cur fs18'
                        // value={cardDescription || ''}
                        // autoFocus
                        // onFocus={e => e.target.select()}
                        // onBlur={handleBlur}
                        // maxLength={100}
                        // onChange={updateDescription}
                        // onKeyDown={ async (event) => {
                        //     if(cardDescription && cardDescription.length && cardDescription.trim()) {
                        //         if (event.key === 'Enter') {
                        //             setShowDescriptionForm(!showDescriptionForm)
                        //             event.preventDefault()
                        //             event.stopPropagation()
                        //             await dispatch(updateCard({...card, description: cardDescription}))
                        //             await dispatch(getAllLists(list.board_id))
                        //         }
                        //         if(event.key === 'Escape') {
                        //             setCardDescription(card.description)
                        //             setShowDescriptionForm(!showDescriptionForm)
                        //         }
                        //     } else if(event.key === 'Escape') setShowDescriptionForm(!showDescriptionForm)
                        // }}
                        // />
                    ) :
                    card.description ? (
                        <div dangerouslySetInnerHTML={{__html: card.description}} onClick={() => setShowDescriptionForm(true)} className='description cur' style={{"marginLeft":"2.5em"}}>
                            {/* {card.description ? <div style={{"overflow":"wrap"}}>{card.description}</div> : <span className='descriptionPlaceholder' style={{"fontSize":"12px"}}>Add a more detailed description...</span>} */}
                        </div>
                    ) :
                        <div onClick={() => setShowDescriptionForm(true)} className='description cur' style={{"marginLeft":"2.5em"}}>
                            {card.description}
                            <span className='descriptionPlaceholder' style={{"fontSize":"12px"}}>Add a more detailed description...</span>
                        </div>
                    }
                </div>
                <div className='fdc g1' style={{"minHeight":"10em"}}>
                    <span className='fs20 aic g1'><i className="fa-solid fa-list"></i>Activity</span>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <input
                                onClick={(e) => e.target.select()}
                                type='text'
                                className='commentInput'
                                value={comment}
                                placeholder='Write a comment...'
                                maxLength={200}
                                onBlur={(e) => e.target.blur()}
                                onChange={updateComment}
                                onKeyDown={ async (event) => {
                                    if(comment.length && comment.trim()) {
                                        if (event.key === 'Enter') {
                                            event.preventDefault()
                                            event.stopPropagation()
                                            await dispatch(createComment({description: comment, card_id: card.id}))
                                            .then(() => dispatch(getAllLists(list.board_id)))
                                            .then(() => setComment(''))
                                        }
                                    }
                                    if(event.key === 'Escape') event.target.blur()
                                }}
                            />
                        </form>
                    </div>
                    <Comments comments={cardComments} />
                </div>
            </div>
            <div className='cardOptions fdc g1 fs20'>
                <div className='exitButtonDiv'>
                    <span onClick={card.showDetails} className='cardExitButton cur'><i className="fa-sharp fa-solid fa-xmark"></i></span>
                </div>
                <div>
                    Add to card
                </div>
                <div className='addLabelToCard aic' onClick={toggleLabelForm}>
                    <i className="fa-solid fa-plus"></i>
                    Add Label
                </div>
                {labelForm && (
                    <div className='labelForm fdc'>
                        <div className='cur' onClick={toggleLabelForm}>X</div>
                        {Object.values(labels).map(label => {
                            let input;
                            const check = label.cards.find(labelCard => labelCard.id === card.id)
                            const change = async (e) => {
                                if(e.target.checked){
                                    handleInputCheck(label.id, card.id, e.target.checked)
                                } else {
                                    handleInputCheck(label.id, card.id, e.target.checked)
                                }
                            }
                            if(check) {
                                input = <input type="checkbox" id={label.id} name={label.id} defaultChecked onChange={change} />
                            } else {
                                input = <input type="checkbox" id={label.id} name={label.id} onChange={change} />
                            }
                            return (
                                <div key={label.id} className={label.color + 'LabelColor labelBorder aic'}>
                                    {input}
                                    <label htmlFor={label.id}>{label.color[0].toUpperCase()}{label.color.slice(1)}</label>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CardModal
