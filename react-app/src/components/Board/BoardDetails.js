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
    }, [id])



    const [ name, setName ] = useState('')
    const [ showListForm, setShowListForm ] = useState(false)
    const updateName = (e) => setName(e.target.value)
    const handleListForm = () => setShowListForm(!showListForm)

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
        <div className={`fdr board ${singleBoard.background}`}>
            <div className='jcc sideBar'>
                <div className='mt1 jcfs check'>
                    <NavLink to={`/${user.username.toLowerCase()}/boards`} className=' jcfs p1 lstd cw check'>
                        Boards
                    </NavLink>
                </div>
            </div>
            <div className='fdc w100'>
                <div className='boardDetailsHeader jcsb'>
                    <h2 className='cw' style={{"margin":"0px"}}>{singleBoard.name}</h2>
                    <button onClick={deleteBoard}>Delete</button>
                    <OpenModalButton
                    id='editBoard'
                    buttonText="Edit Board"
                    onItemClick={closeMenu}
                    modalComponent={<EditBoardModal />}
                    />
                </div>
                <div className='fdr g1 p1'>
                    {lists && lists.map(list => (
                        <ListDetails key={list.id} {...list} />
                    ))}
                    { !showListForm ? <div>
                        <div className='addList cw' onClick={handleListForm}>Add List</div>
                    </div>
                    :
                    (
                    <div className='inputWrapper'>
                        <form className='fdc listForm' onSubmit={handleListSubmit}>
                            <input
                            className='cardInput'
                            type='text'
                            placeholder='Enter a title for this card...'
                            required
                            value={name}
                            onChange={updateName}
                            />
                            <div className='fdr listButtons'>
                                <button type='submit' className='cw addListForm'>Add list</button>
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
