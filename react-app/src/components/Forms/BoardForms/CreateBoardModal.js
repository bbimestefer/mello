import React, { useEffect, useRef, useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from 'react-redux'
import { createBoard } from '../../../store/board'
import './CreateBoardModal.css'

function CreateBoardModal({showForm, setShowForm}) {
    const dispatch = useDispatch();
    const user_id = useSelector(state => state.session.user.id)
    const [ name, setName ] = useState('')
    const [ background, setBackground ] = useState('')
    const [errors, setErrors] = useState([]);
    const ulRef = useRef()

    useEffect(() => {
        console.log("ShowForm", showForm)
        if (!showForm) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowForm(false);
            }
        }

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showForm]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            user_id,
            name,
            background
        }

        return dispatch(createBoard(payload)).then(setShowForm(false))
            .catch((data) => setErrors(data.errors));
        }

    const updateName = (e) => {
        setName(e.target.value);
    };

    const updateBackground = (e) => {
        setBackground(e.target.value);
    };
    return (
        <div className="boardFormContainer fdc" ref={ulRef}>
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
                <button type='submit'>Create Board</button>
            </form>
        </div>
    )
}

export default CreateBoardModal
