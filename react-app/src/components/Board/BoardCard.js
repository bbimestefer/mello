import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllBoards, removeBoard } from '../../store/board'
import './BoardCard.css'

function BoardCard(board) {
    const dispatch = useDispatch()

    const deleteBoard = async () => {
        await dispatch(removeBoard(board.id))
        await dispatch(getAllBoards())
    }

    return (
        <div className=''>
            <Link className='boardCard fdc lstd' to={`/boards/${board.id}/${board.name.toLowerCase()}`}>
                <span className='boardName lstd fwb'>{board.name}</span>
            </Link>
            <button onClick={deleteBoard}>Delete</button>
        </div>
    )
}

export default BoardCard
