import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getBoardById } from '../../store/board'
import OpenModalButton from '../OpenModalButton'
import CardDetails from '../Card'
import { getAllBoards, removeBoard } from '../../store/board'
import './BoardDetails.css'
import EditBoardModal from '../Forms/BoardForms/EditBoardModal'
import { createCard } from '../../store/card'
import { getAllLists } from '../../store/list'

function BoardDetails() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()
    const [ name, setName ] = useState('')
    const [ showForm, setShowForm ] = useState(false)
    const [ showCardForm, setShowCardForm ] = useState(false)
    const ulRef = useRef()

    const user = useSelector(state => state.session.user)
    const singleBoard = useSelector(state => state.boards.singleBoard)
    const lists = useSelector(state => state.lists.boardLists)
    let cards;
    if (lists) cards = lists[id].cards

    useEffect(() => {
        dispatch(getAllLists(id))
    }, [id])

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

    const updateName = (e) => setName(e.target.value)

    const handleCardForm = () => setShowCardForm(!showCardForm)

    const handleCardSubmit = (e) => {
        e.preventDefault()
        const list_id = lists[0].id
        const payload = {
            list_id,
            name
        }

        return dispatch(createCard(payload)).then(dispatch(getBoardById(singleBoard.id)))
        .then(() => {
            setName('')
            setShowCardForm(false)
        })
    }

    useEffect(() => {
        dispatch(getBoardById(id))
    }, [dispatch, id])

    if(!singleBoard.user_id || !cards) return null
    return (
        <div className='fdr board'>
            <div className='jcc sideBar'>
                side bar
            </div>
            <div className='fdc w100'>
                <div className='boardDetailsHeader jcsb'>
                    <h2>{singleBoard.name}</h2>
                    <button onClick={deleteBoard}>Delete</button>
                    <OpenModalButton
                    className='createBoard'
                    buttonText="Edit Board"
                    onItemClick={closeMenu}
                    modalComponent={<EditBoardModal />}
                    />
                </div>
                <div>
                    <h3>{lists[id].name}</h3>
                    {cards && cards.map(card => (
                        <CardDetails key={card.id} {...card} />
                    ))}
                    { !showCardForm && <button onClick={handleCardForm}>Add a card</button>}
                    { showCardForm && (
                        <div>
                            <form className='fdc cardForm' onSubmit={handleCardSubmit}>
                                <textarea
                                className='cardInput'
                                type='text'
                                placeholder='Enter a title for this card...'
                                required
                                value={name}
                                onChange={updateName}
                                />
                                <div className='fdr'>
                                    <button type='submit'>Add card</button>
                                    <button onClick={handleCardForm} type='button'>X</button>
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
