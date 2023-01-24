import React from 'react'
import { Link } from 'react-router-dom'

function BoardCard(board) {
    return (
        <div className='boardCard'>
            <Link to={`/boards/${board.id}/${board.name.toLowerCase()}`}>
                {board.id}: {board.name}
            </Link>
        </div>
    )
}

export default BoardCard
