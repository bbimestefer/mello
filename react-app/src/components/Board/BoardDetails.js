import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { getBoardById } from '../../store/board'
import OpenModalButton from '../OpenModalButton'
import { getAllBoards, removeBoard } from '../../store/board'
import './BoardDetails.css'
import EditBoardModal from '../Forms/BoardForms/EditBoardModal'
import { createList, getAllLists } from '../../store/list'
import ListDetails from '../List'

function BoardDetails() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()
    const [ showForm, setShowForm ] = useState(false)
    const [ showSettings, setShowSettings ] = useState(false)
    const ulRef = useRef()



    const user = useSelector(state => state.session.user)
    const singleBoard = useSelector(state => state.boards.singleBoard)
    const listState = useSelector(state => state.lists.boardLists)
    let lists;
    if(listState) lists = Object.values(listState)


    useEffect(() => {
        dispatch(getBoardById(id))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(getAllLists(id))
    }, [dispatch, id])



    const [ name, setName ] = useState('')
    const [ showListForm, setShowListForm ] = useState(false)
    const [ errors, setErrors ] = useState([])
    const updateName = (e) => setName(e.target.value)
    const handleListForm = () => {
        setName('')
        setShowListForm(!showListForm)
    }

    useEffect(() => {
        const e = []
        if(!name.trim() && name.length) e.push("Name cannot be white space")
        if(!name.length) e.push("Name is required")
        setErrors(e)
    }, [name])

    const handleListSubmit = (e) => {
        e.preventDefault()
        const board_id = singleBoard.id
        const payload = {
            board_id,
            name
        }

        return dispatch(createList(payload))
        .then(() => {
            setName('')
            setShowListForm(false)
        })
    }

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

    if(!singleBoard.user_id || !lists) return null
    return (
        <div className={`fdr board ${singleBoard.background} oxh`}>
            <div className='sideBar jcfs jcc w100'>
                <div className='fdc mt1 jcfs check'>
                    <NavLink to={`/${user.username.toLowerCase()}/boards`} className='jcfs p1 lstd cw check'>
                        Boards
                    </NavLink>
                    <div onClick={() => setShowSettings(!showSettings)} className='jcsb aic p1 lstd cw check cur'><span>Settings</span>{showSettings ? <i className="fa-solid fa-chevron-down"></i> : <i className="fa-solid fa-chevron-right" />}</div>
                    {showSettings && (
                        <div>
                            <div className='jcfs p1 lstd cw check cur'>
                                <OpenModalButton
                                id='editBoard'
                                buttonText="Edit Board"
                                onItemClick={closeMenu}
                                modalComponent={<EditBoardModal />}
                                />
                            </div>
                            <div className='jcfs p1 lstd cw check cur' onClick={deleteBoard}>Delete</div>
                        </div>
                    )}
                </div>
            </div>
            <div className='fdc w100 listOverflow' >
                <div className='boardDetailsHeader jcsb'>
                    <h2 className='cw' style={{"margin":"0px"}}>{singleBoard.name}</h2>
                </div>
                <div className='fdr g1 p1 listsContainer'>
                    {lists && lists.map(list => (
                        <ListDetails key={list.id} {...list} />
                    ))}
                    { !showListForm ? <div>
                        <div className='addList cw' onClick={handleListForm}>Add another list</div>
                    </div>
                    :
                    (
                    <div className='inputWrapper'>
                        <form className='fdc listForm' onSubmit={handleListSubmit}>
                            <div style={{"position":"absolute"}}>
                                {errors.map((error, ind) => (
                                    <div className="listError" key={ind}>{error}</div>
                                ))}
                            </div>
                            <input
                            className='cardInput'
                            autoFocus
                            type='text'
                            placeholder='Enter a title for this card...'
                            required
                            maxLength={50}
                            value={name}
                            onChange={updateName}
                            />
                            <div className='fdr listButtons'>
                                <button disabled={!(name.length && name.trim())} type='submit' className='cw addListForm'>Add list</button>
                                <div onClick={handleListForm} type='button'><i className="fa-regular fa-x cancelListForm jcc cur"></i></div>
                            </div>
                        </form>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BoardDetails
