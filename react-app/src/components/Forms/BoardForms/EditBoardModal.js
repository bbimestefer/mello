import React, { useState, useEffect } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from 'react-redux'
import { getBoardById, updateBoard } from '../../../store/board'
import './EditBoardModal.css'
import fire from '../../../assets/fire.jpg'
import forest from '../../../assets/forest.jpg'
import mountains from '../../../assets/mountains.jpg'
import nightsky from '../../../assets/nightsky.jpg'
import yosemite from '../../../assets/yosemite.jpg'

function EditBoardModal() {
    const dispatch = useDispatch();
    const board = useSelector(state => state.boards.singleBoard)
    const [ name, setName ] = useState(board.name)
    const [ background, setBackground ] = useState(board.background)
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    useEffect(() => {
        const e = []
        if(!name.trim() && name.length) e.push("Name cannot be white space")
        if(!name.length) e.push("Name is required")
        setErrors(e)
    }, [name])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            ...board,
            name,
            background
        }

        return await dispatch(updateBoard(payload)).then(dispatch(getBoardById(board.id))).then(closeModal)
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
                <div className="jcc createBoardFormHeader">Update board</div>
                <div className="fdc">
                <div className={"demo jcc " + background + "Form"}>
                    <img alt="demo" className={"demoImage"} src="https://a.trellocdn.com/prgb/assets/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg" />
                </div>
                {errors.map((error, ind) => (
                    <div className="editError" key={ind}>{error}</div>
                ))}
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
                <label className="nameLabel backgroundLabel">Background</label>
                <div className="fdr fww jcc radioContainer">
                    <label>
                        <input
                        className={`radio`}
                            type="radio"
                            name="background"
                            value='fire'
                            onChange={updateBackground}
                        />
                        <img alt="fire" className="imageSelect cur" src={fire} />
                    </label>
                    <label>
                        <input
                            className={`radio`}
                            type="radio"
                            name="background"
                            value='forest'

                            onChange={updateBackground}
                        />
                        <img alt="forest" className="imageSelect cur" src={forest} />
                    </label>
                    <label>
                        <input
                            className={`radio`}
                            type="radio"
                            name="background"
                            value='mountains'
                            onChange={updateBackground}
                        />
                        <img alt="mountains" className="imageSelect cur" src={mountains} />

                    </label>
                    <label>
                        <input
                            className={`radio`}
                            type="radio"
                            name="background"
                            value='nightsky'
                            onChange={updateBackground}
                        />
                        <img alt="nightsky" className="imageSelect cur" src={nightsky} />
                    </label>
                    <label>
                        <input
                            className={`radio`}
                            type="radio"
                            name="background"
                            value='yosemite'
                            onChange={updateBackground}
                        />
                        <img alt="yosemite" className={"imageSelect cur"} src={yosemite} />
                    </label>
                </div>
                <button disabled={!!errors.length} className={errors.length ? "boardSubmitOff" : "boardSubmit"} type='submit'>Edit Board</button>
            </form>
            <button className="boardSubmit" style={{"marginTop":"5px"}} onClick={closeModal}>Cancel</button>
        </div>
    )
}

export default EditBoardModal
