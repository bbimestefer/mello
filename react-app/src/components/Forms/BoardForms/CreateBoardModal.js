import React, { useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from 'react-redux'
import { createBoard } from '../../../store/board'

function CreateBoardModal() {
    const dispatch = useDispatch();
    const user_id = useSelector(state => state.session.user.id)
    const [ name, setName ] = useState('')
    const [ background, setBackground ] = useState('')
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            user_id,
            name,
            background
        }

        return dispatch(createBoard(payload)).then(closeModal)
            .catch((data) => setErrors(data.errors));
        }

    const updateName = (e) => {
        setName(e.target.value);
    };

    const updateBackground = (e) => {
        setBackground(e.target.value);
    };
    return (
        <div>

            <form onSubmit={handleSubmit}>
                <div>
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
                <button type='submit'>Create Board</button>
            </form>
            <button onClick={closeModal}>Cancel</button>
        </div>
    )
}

export default CreateBoardModal
