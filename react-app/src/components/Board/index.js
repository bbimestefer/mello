import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllBoards } from '../../store/board'
import CreateBoardForm from '../Forms/BoardForms/CreateBoardForm'
import BoardCard from './BoardCard'
import './index.css'

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
        <div className='fdc'>
            <div className='fwb'>
                Your Boards:
            </div>
            <div className='boards fww fdr g1'>
                {boards && boards.map(board => (
                    <BoardCard key={board.id} {...board} />
                ))}
                {!showForm && <div className='boardCard jcc aic lstd' id='add' onClick={handleClick}>Create New Board</div>}
                {showForm && <CreateBoardForm showForm={showForm} setShowForm={setShowForm} />}
            </div>
        </div>
    )
}

export default Boards
