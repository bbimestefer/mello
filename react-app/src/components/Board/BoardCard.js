import React from 'react'
import { Link } from 'react-router-dom'
import './BoardCard.css'

function BoardCard(board) {

    const boardCardClass = 'boardCard fdc lstd ' + board.background

    return (
        <Link className={boardCardClass} to={`/boards/${board.id}/${board.name.toLowerCase()}`}>
            <span className='boardName lstd fwb cw'>{board.name}</span>
        </Link>
    )
}

export default BoardCard
