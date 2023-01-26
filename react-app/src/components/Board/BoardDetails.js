import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getBoardById } from '../../store/board'
import OpenModalButton from '../OpenModalButton'
// import CardDetails from '../Card'
import { getAllBoards, removeBoard } from '../../store/board'
import './BoardDetails.css'
import EditBoardModal from '../Forms/BoardForms/EditBoardModal'

function BoardDetails() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()
    const [ showForm, setShowForm ] = useState(false)
    const ulRef = useRef()

    const user = useSelector(state => state.session.user)
    const singleBoard = useSelector(state => state.boards.singleBoard)
    // const cards = useSelector(state => state.boards.userBoards[id].lists[0].cards)

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

    const deleteBoard = async () => {
        await dispatch(removeBoard(singleBoard.id))
        await dispatch(getAllBoards())
        history.push(`/${user.username}/boards`)
    }

    const closeMenu = () => setShowForm(false);


    useEffect(() => {
        dispatch(getBoardById(id))
    }, [dispatch, id])

    if(!singleBoard.user_id) return null
    return (
        <div className='fdr board'>
            <div className='jcc sideBar'>
                side bar
            </div>
            <div className='fdc w100'>
                <div className='boardDetailsHeader jcsb'>
                    {singleBoard.name}
                    <button onClick={deleteBoard}>Delete</button>
                    <OpenModalButton
                    className='createBoard'
                    buttonText="Edit Board"
                    onItemClick={closeMenu}
                    modalComponent={<EditBoardModal />}
                    />
                </div>
                <div>
                    {/* {cards && cards.map(card => (
                        <CardDetails key={card.id} {...card} />
                    ))} */}
                </div>
            </div>
        </div>
    )
}

export default BoardDetails
