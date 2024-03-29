import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { removeCard, updateCard } from '../../store/card'
import { getAllLists } from '../../store/list'
import CardModal from './CardModal'
import './index.css'

function CardDetails({card, provided, innerRef, index}) {
    const dispatch = useDispatch()
    const [toggle, setToggle] = useState(true)
    const [addButtons, setAddButtons] = useState(false)
    const [showCardDetails, setShowCardDetails] = useState(false)
    const [name, setName] = useState(card.name)
    const { id } = useParams()

    const list = useSelector(state => state.lists.boardLists[card.list_id])
    const cardFromList = list.cards.find(el => el.id === card.id)

    const handleDelete = async () => {
        dispatch(removeCard(card.id)).then(() => {
            dispatch(getAllLists(id))
        })
    }

    const handleBlur = () => {
        setName(card.name)
        setToggle(!toggle)
    }

    const handleShowCardDetails = () => {
        setShowCardDetails(!showCardDetails)
    }

    const updateName = (e) => {setName(e.target.value)}

    return (
        <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={innerRef}
        >
            {toggle ? (
                <div className='card jcsb fdr aic' style={{"gap":"1em"}}
                    onMouseEnter={() => setAddButtons(true)}
                    onMouseLeave={() => setAddButtons(false)}
                    >
                    <div onClick={handleShowCardDetails} className='cardName cur'>
                        <div className='labelHolder fdr' style={{"gap": "2px"}}>
                            {!!cardFromList.label.length && (
                                cardFromList.label.map(label => (
                                    <div key={label.id} className={'labelForCard ' + label.color + 'LabelColor'} ></div>
                                ))
                            )}
                        </div>
                        {name}
                    </div>

                    {addButtons && (
                        <div className='fdr cardButtons'>
                            <div className='aic jcc divDCard cur' onClick={() => setToggle(false)}>...</div>
                            <div className='aic jcc divDCard cur' onClick={handleDelete}><i className="fa-regular fa-x deleteCard"></i></div>
                        </div>
                    )}
                </div>
            ) : (
                <input
                onClick={(e) => e.target.select()}
                className='card w100 inputForCard'
                type='text'
                value={name}
                autoFocus
                onFocus={e => e.target.select()}
                onBlur={handleBlur}
                maxLength={50}
                onChange={updateName}
                onKeyDown={ async (event) => {
                    if(name.length && name.trim()) {
                        if (event.key === 'Enter') {
                            setToggle(true)
                            event.preventDefault()
                            event.stopPropagation()
                            await dispatch(updateCard({...card, name}))
                            await dispatch(getAllLists(id))
                        }
                    } else {
                        event.target.select()
                    }
                    if(event.key === 'Escape') {
                        setName(card.name)
                        setToggle(true)
                    }
                }}
                />
            )}
            {showCardDetails && (
                <div onClick={handleShowCardDetails} className='jcc aic cardModalContainer'>
                    <CardModal {...card} showDetails={handleShowCardDetails} />
                </div>
            )}

        </div>
    )
}

export default CardDetails
