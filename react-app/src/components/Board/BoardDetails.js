import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBoardById } from '../../store/board'
import EditBoardForm from '../Forms/BoardForms/EditBoardForm'

function BoardDetails() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [ showForm, setShowForm ] = useState(false)

    const singleBoard = useSelector(state => state.boards.singleBoard)

    useEffect(() => {
        dispatch(getBoardById(id))
    }, [dispatch, id])

    const handleEditClick = () => {
        setShowForm(true)
    }

    if(!singleBoard.user_id) return null
    return (
        <div>
            <div>
                {singleBoard.name}
                <button onClick={handleEditClick}>Edit</button>
            </div>
            {showForm && <EditBoardForm board={singleBoard} showForm={showForm} setShowForm={setShowForm} />}
        </div>
    )
}

export default BoardDetails
