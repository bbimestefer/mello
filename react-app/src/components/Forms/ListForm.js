import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBoardById } from '../../store/board'
import { removeList, updateList } from '../../store/list'

function ListForm(list) {
    const dispatch = useDispatch()
    const [toggle, setToggle] = useState(false)
    const [name, setName] = useState(list.name)
    const { id } = useParams()

    const handleDelete = async () => {
        await dispatch(removeList(list.id))
    }

    const updateName = (e) => {setName(e.target.value)}

    return (
        <div className='fdr g1'>
            { !toggle ?
            <p onDoubleClick={() => {
                setToggle(true)
            }}>
                {name}
            </p>
            :
            <div>
                <input
                className='input'
                type='text'
                value={name}
                onChange={updateName}
                onKeyDown={ async (event) => {
                    if (event.key === 'Enter') {
                    setToggle(false)
                    event.preventDefault()
                    event.stopPropagation()
                    await dispatch(updateList({...list, name}))
                    await dispatch(getBoardById(id))
                    }
                    else if(event.key === 'Escape') setToggle(false)
                }}

                />
            </div>}
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default ListForm
