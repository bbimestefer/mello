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
        <div className='fdr jcsb w100'>
            { !toggle ?
            <div className='fwb' onClick={() => {
                setToggle(true)
            }}>
                {name}
            </div>
            :
            <div>
                <input
                className='input'
                type='text'
                autoFocus
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
            <div className='cur' onClick={handleDelete}><i className="fa-regular fa-x"></i></div>
        </div>
    )
}

export default ListForm
