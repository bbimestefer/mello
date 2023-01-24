import React from 'react'
import { useSelector } from 'react-redux'
import BoardCard from './BoardCard'

function Boards() {
    const boards = useSelector(state => state.session.user.boards)
    if(!boards) return null
    return (
        <div>
            Boards:
            {boards && boards.map(board => (
                <BoardCard key={board.id} {...board} />
            ))}
        </div>
    )
}

export default Boards
