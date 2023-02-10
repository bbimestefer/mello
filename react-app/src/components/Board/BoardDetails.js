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

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
    }, [])

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
        .then((newList) => {
            setName('')
            setShowListForm(false)
            console.log(newList)
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

    // console.log('SINGLE BOARD ORDER', singleBoard.list_order, 'SINGLE BOARD ORDER SPLIT',singleBoard.list_order ? singleBoard.list_order.split(',') : 'nope-------------------------------------------------')

    // const [ orderOfList, setOrderOfList ] = useState(singleBoard.list_order || singleBoard.lists)

    // useEffect(() => {
    //     console.log("IN USE EFFEcT", orderOfList, singleBoard.list_order ? singleBoard.list_order.split(',') : 'its jsujt not')
    //     setOrderOfList(singleBoard.list_order ? singleBoard.list_order.split(',') : singleBoard.lists)
    //     console.log("AFTER ASSIGNING IT", orderOfList, singleBoard.list_order ? singleBoard.list_order.split(',') : 'its jsujt not')
    // }, [singleBoard, singleBoard.list_order])


    const listOnDragEnd = async (result, orderOfList, setorderOfList) => {
        // if (!result.destination) return;
        // const { source, destination } = result;

        // console.log('Source',source, "Destination", destination)

        // console.log("IN DRAG ORDER", orderOfList)
        // if (source.droppableId !== destination.droppableId) {
        //     const sourceColumn = orderOfList[source.index];
        //     const destColumn = orderOfList[destination.index];
        //     console.log(sourceColumn,'--------------------', destColumn)
        //     // const sourceItems = [...sourceColumn.items];
        //     // const destItems = [...destColumn.items];
        //     // const [removed] = sourceItems.splice(source.index, 1);
        //     // destItems.splice(destination.index, 0, removed);
        //     // let something = ''
        //     // destItems.forEach(item => {
        //     // console.log(item.id)
        //     // something += item.id
        //     // })
        //     // console.log('SOMETHING', something.split(''))
        //     // something = something.split('')
        //     // console.log('should be array',something)
        //     // console.log('item', destItems.find(item => item.id === something[0]))
        //     // console.log('SOMETHING joins', something.join(''))
        //     // setOrderOfList({
        //     // ...orderOfList,
        //     // [source.droppableId]: {
        //     //     ...sourceColumn,
        //     //     items: sourceItems
        //     // },
        //     // [destination.droppableId]: {
        //     //     ...destColumn,
        //     //     items: destItems
        //     // }
        //     // });
        // } else {
        //     const column = orderOfList[source.index];
        //     console.log(column,'--------------------')
        //     const copyOrder = [...orderOfList]
        //     const [removed] = copyOrder.splice(source.index, 1);
        //     console.log('Removed', removed)
        //     copyOrder.splice(destination.index, 0, removed);
        //     console.log("COPIED", copyOrder)
        //     setOrderOfList(copyOrder)
        //     let stringToDB = ''
        //     copyOrder.forEach((item) => {
        //         console.log(item.id)
        //         stringToDB += item.id + ','
        //     })
        //     console.log('string', stringToDB.split(','))
        //     stringToDB = stringToDB.split(',').filter(num => num.length !== 0)

        //     console.log('should be array',stringToDB)
        //     console.log('item', copyOrder.find(item => item.id === Number(stringToDB[0])))
        //     console.log('string jkoin', stringToDB.join(','))
        //     stringToDB = stringToDB.join(',')

        //     console.log("PAYLOAD", {...singleBoard, list_order: stringToDB})

        //     await dispatch(updateBoard({...singleBoard, list_order: stringToDB}))
        // }
    }


    if(!singleBoard.user_id || !lists) return null
    return (
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
                <DragDropContext onDragEnd={(result) => listOnDragEnd(result, {/*orderOfList, setOrderOfList*/})}>
                    <Droppable droppableId="lists" direction="horizontal">
                        {(provided) => (
                            <div className='fdr g1 p1 listsContainer' {...provided.droppableProps} ref={provided.innerRef}>
                                {lists && lists.map((list, index) => (
                                    <Draggable key={list.id} draggableId={`${list.id}`} index={index}>
                                        {(provided) => (
                                            <ListDetails pDragHandle={provided.dragHandleProps} pDragProps={provided.draggableProps} ref={provided.innerRef} {...list} />
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
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
                        )}
                    </Droppable>
                    {/* <div className='fdr g1 p1 listsContainer'>
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
                    </div> */}
                </DragDropContext>
            </div>
        </div>
    )
}

export default BoardDetails
