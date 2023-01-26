import React from 'react'
import { Link } from 'react-router-dom'
import './BoardCard.css'

function BoardCard(board) {
    return (
        <Link className='boardCard fdc lstd' to={`/boards/${board.id}/${board.name.toLowerCase()}`}>
            <span className='boardName lstd fwb'>{board.name}</span>
        </Link>
    )
}

export default BoardCard
