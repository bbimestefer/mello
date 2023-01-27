import React, { useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from 'react-redux'
import { getBoardById, updateBoard } from '../../../store/board'
import './EditBoardModal.css'

function EditBoardModal() {
    const dispatch = useDispatch();
    const board = useSelector(state => state.boards.singleBoard)
    const [ name, setName ] = useState(board.name)
    const [ background, setBackground ] = useState(board.background)
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            ...board,
            name,
            background
        }


        return dispatch(updateBoard(payload)).then(dispatch(getBoardById(board.id))).then(closeModal)
            .catch((data) => setErrors(data.errors));
        }

    const updateName = (e) => {
        setName(e.target.value);
    };

    const updateBackground = (e) => {
        setBackground(e.target.value);
    };
    if(!board) return null
    return (
        <div className="boardFormContainer fdc change">
            <form className="fdc" onSubmit={handleSubmit}>
                <div className="fdc">
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
                </div>
                <label>Name</label>
                <input
                    type='text'
                    name='name'
                    required
                    onChange={updateName}
                    value={name}
                />
                <label>Background</label>
                <input
                    type='text'
                    name='background'
                    required
                    onChange={updateBackground}
                    value={background}
                />
                <button type='submit'>Edit Board</button>
            </form>
            <button onClick={closeModal}>Cancel</button>
        </div>
    )
}

export default EditBoardModal
