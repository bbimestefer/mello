import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBoardById } from '../../store/board'
import { removeCard, updateCard } from '../../store/card'
import { getAllLists } from '../../store/list'

function CardDetails(card) {
    const dispatch = useDispatch()
    const [toggle, setToggle] = useState(true)
    const [name, setName] = useState(card.name)
    const { id } = useParams()

    const handleDelete = async () => {
        await dispatch(removeCard(card.id)).then(dispatch(getAllLists(id)))
    }

    const updateName = (e) => {setName(e.target.value)}

    return (
        <div>
            {toggle ? (
                <div className='jcsb fdr aic' style={{"gap":"1em"}}>
                    <p onDoubleClick={() => {
                        setToggle(false)
                    }}
                    >{name}</p>
                    <button onClick={handleDelete} style={{"height":"2em"}}>Delete</button>
                </div>
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
