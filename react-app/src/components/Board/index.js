import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBoards } from '../../store/board'
import CreateBoardForm from '../Forms/CreateBoardForm'
import BoardCard from './BoardCard'

function Boards() {
    const dispatch = useDispatch()
    const [ showForm, setShowForm ] = useState(false)
    const userBoards = useSelector(state => state.boards.userBoards)
    const boards = Object.values(userBoards)

    useEffect(() => {
        dispatch(getAllBoards())
    }, [dispatch])

    const handleClick = () => {
        setShowForm(!showForm)
    }

    // if(!boards) return null
    return (
        <div>
            <div>
                Boards:
            </div>
            {boards && boards.map(board => (
                <BoardCard key={board.id} {...board} />
            ))}
            {!showForm && <button onClick={handleClick}>Add Board</button>}
            {showForm && <CreateBoardForm showForm={showForm} setShowForm={setShowForm} />}
        </div>
    )
}

export default Boards
