import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { createBoard } from '../../../store/board'
import './CreateBoardModal.css'
import fire from '../../../assets/fire.jpg'
import forest from '../../../assets/forest.jpg'
import mountains from '../../../assets/mountains.jpg'
import nightsky from '../../../assets/nightsky.jpg'
import yosemite from '../../../assets/yosemite.jpg'
import { useHistory } from "react-router-dom";

function CreateBoardModal({showForm, setShowForm}) {
    const dispatch = useDispatch();
    const user_id = useSelector(state => state.session.user.id)
    const [ name, setName ] = useState('')
    const [ background, setBackground ] = useState('fire')
    const [errors, setErrors] = useState([]);
    const ulRef = useRef()
    const history = useHistory()

    useEffect(() => {
        const e = []
        if(!name.trim() && name.length) e.push("Name cannot be white space")
        if(!name.length) e.push("Name is required")
        setErrors(e)
    }, [name])

    useEffect(() => {
        if (!showForm) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowForm(false);
            }
        }

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showForm, setShowForm]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            user_id,
            name,
            background
        }

        return dispatch(createBoard(payload)).then(setShowForm(false)).then(createdBoard => history.push(`/boards/${createdBoard.id}/${createdBoard.name}`))
        // .then(createBoard => {
        //     createBoard.name = createBoard.name.split(' ')
        //     return createBoard
        // })
        // .then(createBoard =>{
        //     history.push(`/boards/${createBoard.id}/${createBoard.name.join('-')}`)
        // })
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
                <div className="jcc createBoardFormHeader">Create board</div>
                <div className={"demo jcc " + background}>
                    <img alt="demo" className={"demoImage"} src="https://a.trellocdn.com/prgb/assets/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg" />
                </div>
                <label className="fwb nameLabel">Board name <span style={{"color":"red"}}>*</span></label>
                <input
                    type='text'
                    name='name'
                    maxLength={100}
                    required
                    onChange={updateName}
                    value={name}
                />
                {errors.map((error, ind) => (
                    <div className="error" key={ind}>{error}</div>
                ))}
                <label className="fwb nameLabel backgroundLabel">Background</label>
                <div className="fdr fww jcc radioContainer">
                    <label>
                        <input
                        className={`radio`}
                            type="radio"
                            name="background"
                            value='fire'
                            onChange={updateBackground}
                        />
                        <img alt="fire" className="imageSelect" src={fire} />
                    </label>
                    <label>
                        <input
                            className={`radio`}
                            type="radio"
                            name="background"
                            value='forest'

                            onChange={updateBackground}
                        />
                        <img alt="forest" className="imageSelect" src={forest} />
                    </label>
                    <label>
                        <input
                            className={`radio`}
                            type="radio"
                            name="background"
                            value='mountains'
                            onChange={updateBackground}
                        />
                        <img alt="mountains" className="imageSelect" src={mountains} />

                    </label>
                    <label>
                        <input
                            className={`radio`}
                            type="radio"
                            name="background"
                            value='nightsky'
                            onChange={updateBackground}
                        />
                        <img alt="nightsky" className="imageSelect" src={nightsky} />
                    </label>
                    <label>
                        <input
                            className={`radio`}
                            type="radio"
                            name="background"
                            value='yosemite'
                            onChange={updateBackground}
                        />
                        <img alt="yosemite" className="imageSelect" src={yosemite} />
                    </label>
                </div>
                {/* <input
                    type='text'
                    name='background'
                    required
                    onChange={updateBackground}
                    value={background}
                /> */}
                <button disabled={!!errors.length} className={errors.length ? "boardSubmitOff" : "boardSubmit"} type='submit'>Create Board</button>
            </form>
        </div>
    )
}

export default CreateBoardModal
