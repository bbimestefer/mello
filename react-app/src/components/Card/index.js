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

    const updateName = (e) => {setName(e.target.value)}

    return (
        <div>
            {toggle ? (
                <div className='card jcsb fdr aic cur' style={{"gap":"1em"}}
                    onMouseEnter={() => setAddButtons(true)}
                    onMouseLeave={() => setAddButtons(false)}
                    >
                    <p>{name}</p>
                    {addButtons && (
                        <div className='fdr cardButtons'>
                            <div className='aic jcc divDCard cur' onClick={() => setToggle(false)}>...</div>
                            <div className='aic jcc divDCard cur' onClick={handleDelete}><i className="fa-regular fa-x deleteCard"></i></div>
                        </div>
                    )}
                </div>
            ) : (
                <input
                className='inputForCard'
                type='text'
                value={name}
                autoFocus
                onChange={updateName}
                onKeyDown={ async (event) => {
                    if (event.key === 'Enter') {
                    setToggle(true)
                    event.preventDefault()
                    event.stopPropagation()
                    await dispatch(updateCard({...card, name}))
                    await dispatch(getBoardById(id))
                    }
                    else if(event.key === 'Escape') {
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
