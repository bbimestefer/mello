import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBoard } from '../../store/board'

function CreateBoardForm({ showForm, setShowForm}) {
    const dispatch = useDispatch()
    const user_id = useSelector(state => state.session.user.id)

    const [ name, setName ] = useState('')
    const [ background, setBackground ] = useState('')
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            user_id,
            name,
            background
        }

        const data = await dispatch(createBoard(payload))
        setShowForm(!showForm)
        if(data){
            console.log("DATA", data)
            return setErrors(data)
        }
    }

    const updateName = (e) => {
        setName(e.target.value);
    };

    const updateBackground = (e) => {
        setBackground(e.target.value);
    };

    return (
        <div>
            <button onClick={() => setShowForm(!showForm)}>Cancel</button>
            <form onSubmit={handleSubmit}>
                <div>
                {errors.lenght && errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
                </div>
                <label>Name</label>
                <input
                    type='text'
                    name='name'
                    onChange={updateName}
                    value={name}
                />
                <label>Background</label>
                <input
                    type='text'
                    name='background'
                    onChange={updateBackground}
                    value={background}
                />
                <button type='submit'>Create Board</button>
            </form>
        </div>

    )
}

export default CreateBoardForm
