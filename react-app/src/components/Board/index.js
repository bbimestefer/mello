import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBoards } from '../../store/board'
import CreateBoardModal from '../Forms/BoardForms/CreateBoardModal'
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


    if(!boards) return null
    return (
        <div className='fdc'>
            <div className='fwb'>
                Your Boards:
            </div>
            <div className='boards fww fdr g1'>
                {boards && boards.map(board => (
                    <BoardCard key={board.id} {...board} />
                ))}
                <div className='boardCard'>
                    <button className='boardListCreate' onClick={() => setShowForm(true)}>Create new board</button>
                    {showForm && <div className='createModalPosition'><CreateBoardModal showForm={showForm} setShowForm={setShowForm}/></div>}
                </div>
            </div>
        </div>
    )
}

export default Boards
