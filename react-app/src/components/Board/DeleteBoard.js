import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { removeBoard } from '../../store/board'
import './DeleteBoard.css'

function DeleteBoard({ board, pushHistory }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [ name, setName ] = useState('')
    const { closeModal } = useModal()

    const deleteBoard = async () => {
        await dispatch(removeBoard(board.id))
        .then(closeModal)
        .then(() => pushHistory.push(`/${user.username.toLowerCase()}/boards`))
    }

    const updateName = (e) => setName(e.target.value)

    return (
        <div className='p1 g1 fdc deleteBoardModalContainer'>
            <div className='fwb'>Delete Board</div>
            <div className='jcc'>
                To delete this board, type <span className='fwb' style={{"color":"rgb(255, 93, 93)"}}>"{board.name}"</span>.
            </div>
            <div className='jcc'>
                This cannot be undone!
            </div>
            <input
                className='deleteInput'
                style={{"width":"100%"}}
                type='text'
                onChange={updateName}
            />
            {name === board.name ? <button className="boardSubmit" onClick={deleteBoard}>Delete</button>
            :
            <button disabled className="boardSubmitOff" onClick={deleteBoard}>Delete</button>}
        </div>
    )
}

export default DeleteBoard
