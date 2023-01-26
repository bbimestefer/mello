import React, { useState } from 'react'
// import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateBoard } from '../../../store/board'

function EditBoardForm({ board, showForm, setShowForm }) {
    const dispatch = useDispatch()

    const [ name, setName ] = useState(board.name)
    const [ background, setBackground ] = useState(board.background)
    const [errors, setErrors] = useState([]);
    // const [clicked, setClicked] = useState(false);
    // const [submit, setSubmit] = useState(false);
    // const [payload, setPayload] = useState('');

    // useEffect(() => {
    //     (async() => {

    //         if(submit && payload){
    //             const data = await dispatch(updateBoard(payload))
    //             if(data){
    //                 return setErrors(data)
    //             }
    //         }
    //     })()

    //     return () => {
    //         setSubmit(false)
    //     }
    // }, [dispatch, submit, payload])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...board,
            name,
            background
        }

        const data = await dispatch(updateBoard(payload))
        setShowForm(!showForm)
        if(data){
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
                {errors && errors.map((error, ind) => (
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
                <button type='submit'>Update Board</button>
            </form>
        </div>

    )
}

export default EditBoardForm
