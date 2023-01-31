import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBoardById } from '../../store/board'
import { removeCard, updateCard } from '../../store/card'
import { getAllLists } from '../../store/list'
import './index.css'

function CardDetails(card) {
    const dispatch = useDispatch()
    const [toggle, setToggle] = useState(true)
    const [addButtons, setAddButtons] = useState(true)
    const [name, setName] = useState(card.name)
    const { id } = useParams()


    const handleDelete = async () => {
        // console.log("DELETE")
        dispatch(removeCard(card.id)).then(() => {
            // console.log("NOW LIST")
            dispatch(getAllLists(id))
        })
    }

    const handleBlur = () => {
        setName(card.name)
        setToggle(!toggle)
    }
    const updateName = (e) => {setName(e.target.value)}

    return (
        <div>
            {toggle ? (
                <div className='card jcsb fdr aic cur' style={{"gap":"1em"}}
                    onMouseEnter={() => setAddButtons(true)}
                    onMouseLeave={() => setAddButtons(false)}
                    >
                    <p className='cardName'>{name}</p>
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
                className='inputForCard'
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
                            await dispatch(getBoardById(id))
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

        </div>
    )
}

export default CardDetails
