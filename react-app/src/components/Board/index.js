import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBoards } from '../../store/board'
import CreateBoardModal from '../Forms/BoardForms/CreateBoardModal'
import OpenModalButton from '../OpenModalButton'
import BoardCard from './BoardCard'
import './index.css'

function Boards() {
    const dispatch = useDispatch()
    const [ showForm, setShowForm ] = useState(false)
    const userBoards = useSelector(state => state.boards.userBoards)
    const boards = Object.values(userBoards)
    const ulRef = useRef()

    useEffect(() => {
        if (!showForm) return;

        const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
            setShowForm(false);
        }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showForm]);

    useEffect(() => {
        dispatch(getAllBoards())
    }, [dispatch])

    const closeMenu = () => setShowForm(false);

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
                <div>
                    <OpenModalButton
                        id='createBoard'
                        buttonText="Create Board"
                        onItemClick={closeMenu}
                        modalComponent={<CreateBoardModal />}
                    />
                </div>
            </div>
        </div>
    )
}

export default Boards
