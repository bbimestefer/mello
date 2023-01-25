import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getBoardById } from '../../store/board'
// import CardDetails from '../Card'
import { getAllBoards, removeBoard } from '../../store/board'
import EditBoardForm from '../Forms/BoardForms/EditBoardForm'
import './BoardDetails.css'

function BoardDetails() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()
    const [ showForm, setShowForm ] = useState(false)

    const user = useSelector(state => state.session.user)
    const singleBoard = useSelector(state => state.boards.singleBoard)
    // const cards = useSelector(state => state.boards.userBoards[id].lists[0].cards)

    const deleteBoard = async () => {
        await dispatch(removeBoard(singleBoard.id))
        await dispatch(getAllBoards())
        history.push(`/${user.username}/boards`)
    }


    useEffect(() => {
        dispatch(getBoardById(id))
    }, [dispatch, id])

    const handleEditClick = () => {
        setShowForm(true)
    }

    if(!singleBoard.user_id) return null
    return (
        <div className='fdr'>
            <div className='jcc sideBar'>
                side bar
            </div>
            <div className='fdc w100'>
                <div className='jcsb'>
                    {singleBoard.name}
                    <button onClick={handleEditClick}>Edit</button>
                    <button onClick={deleteBoard}>Delete</button>
                    {showForm && <EditBoardForm board={singleBoard} showForm={showForm} setShowForm={setShowForm} />}
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
