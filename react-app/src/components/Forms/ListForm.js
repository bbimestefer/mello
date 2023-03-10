import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBoardById } from '../../store/board'
import { removeList, updateList } from '../../store/list'
import './ListForm.css'

function ListForm(list) {
    const dispatch = useDispatch()
    const [listEdit, setListEdit] = useState(false)
    const [name, setName] = useState(list.name)
    const { id } = useParams()

    const handleListEdit = () => {
        setName(list.name)
        setListEdit(!listEdit)
    }

    const handleDelete = async () => {
        await dispatch(removeList(list.id))
    }

    const updateName = (e) => {setName(e.target.value)}

    return (
        <div className='fdr jcsb w100'>
            { !listEdit ?
            <div className='listName fwb' onClick={() => {
                setListEdit(true)
            }}>
                {name}
            </div>
            :
                <input
                className='editListName'
                type='text'
                autoFocus
                onFocus={e => e.target.select()}
                onBlur={handleListEdit}
                value={name}
                maxLength={50}
                onChange={updateName}
                onKeyDown={ async (event) => {
                    if(name.length && name.trim()) {
                        if (event.key === 'Enter') {
                        setListEdit(false)
                        event.preventDefault()
                        event.stopPropagation()
                        await dispatch(updateList({...list, name}))
                        await dispatch(getBoardById(id))
                        }
                    } else {
                        event.target.select()
                    }
                    if(event.key === 'Escape') {
                        handleListEdit()
                    }
                }}
                />
            }
            <div className='cur' onClick={handleDelete}><i className="fa-regular fa-x deleteListButton"></i></div>
        </div>
    )
}

export default ListForm
