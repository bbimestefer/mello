import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBoardById } from '../../store/board'
import { updateCard } from '../../store/card'

function CardDetails(card) {
    const dispatch = useDispatch()
    const [toggle, setToggle] = useState(true)
    const [name, setName] = useState(card.name)
    const { id } = useParams()

    const updateName = (e) => {setName(e.target.value)}
    return (
        <div>
            {toggle ? (
                <p onDoubleClick={() => {
                    setToggle(false)
                }}
                >{name}</p>
            ) : (
                <input
                className='input'
                type='text'
                value={name}
                onChange={updateName}
                onKeyDown={ async (event) => {
                    if (event.key === 'Enter') {
                    setToggle(true)
                    event.preventDefault()
                    event.stopPropagation()
                    await dispatch(updateCard({...card, name}))
                    await dispatch(getBoardById(id))
                    }
                    else if(event.key === 'Escape') setToggle(true)
                }}

                />
            )}

        </div>
    )
}

export default CardDetails
