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
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { updateCard } from '../../store/card'

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

    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result

        if (!destination) return

        // If card is moved to a different list
        if (destination.droppableId !== source.droppableId) {
            // UPDATE AND MATCH THE DROPPABLE ID FORMAT AND DRAGGABLE ID FORMAT
            let sourceList = lists.find(list => list.name === source.droppableId)
            let destinationList = lists.find(list => list.name === destination.droppableId)
            let card = sourceList?.cards.find(card => card.id.toString() === draggableId.toString())

            let payload = {
                id: card.id,
                name: card.name,
                description: card.description,
                list_id: destinationList.id,
            }

            await dispatch(updateCard(payload)).then(() => dispatch(getAllLists(id))).catch(data => console.log("OH NO", data))

        }
    }

    if(!singleBoard.user_id || !lists) return null
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={`fdr board ${singleBoard.background} oxh`}>
                <div className='sideBar jcfs jcc w100'>
                    <div className='fdc mt1 jcfs' style={{"width":"94%"}}>
                        <NavLink to={`/${user.username.toLowerCase()}/boards`} className='jcfs lstd cw boardNavItems'>
                            Boards
                        </NavLink>
                        <div onClick={() => setShowSettings(!showSettings)} className='jcsb aic lstd cw boardNavItems cur'>
                            <span>Settings</span>{showSettings ? <i className="fa-solid fa-chevron-down"></i> : <i className="fa-solid fa-chevron-right" />}
                        </div>
                        {showSettings && (
                            <div>
                                <div className='jcfs lstd cw boardNavItems cur'>
                                    <OpenModalButton
                                    id='editBoard'
                                    buttonText="Edit Board"
                                    onItemClick={closeMenu}
                                    modalComponent={<EditBoardModal />}
                                    />
                                </div>
                                <div className='jcfs lstd cw cur boardNavItems' onClick={deleteBoard}>Delete</div>
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
                            <Droppable droppableId={list.name} key={`${list.id}${list.name}`}>
                                {(provided, snapshot) => (
                                    <ListDetails
                                        list={list}
                                        placeholder={provided.placeholder}
                                        provided={provided}
                                    />
                                )}
                            </Droppable>
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
                                className='addInput'
                                autoFocus
                                type='text'
                                placeholder='Enter a title for this card...'
                                required
                                maxLength={50}
                                value={name}
                                onChange={updateName}
                                />
                                <div className='fdr listButtons aic'>
                                    <button disabled={!(name.length && name.trim())} type='submit' className='cw addListForm'>Add list</button>
                                    <div onClick={handleListForm} type='button'><i className="fa-regular fa-x cancelListForm cur"></i></div>
                                </div>
                            </form>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </DragDropContext>
    )
}

export default BoardDetails
