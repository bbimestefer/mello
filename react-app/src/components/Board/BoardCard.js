import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllBoards, removeBoard } from '../../store/board'

function BoardCard(board) {
    const dispatch = useDispatch()

    const deleteBoard = async () => {
        await dispatch(removeBoard(board.id))
        await dispatch(getAllBoards())
    }

    return (
        <div className='boardCard'>
            <Link to={`/boards/${board.id}/${board.name.toLowerCase()}`}>
                {board.id}: {board.name}
            </Link>
            <button onClick={deleteBoard}>Delete</button>
        </div>
    )
}

export default BoardCard
