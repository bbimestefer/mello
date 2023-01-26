import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createCard } from '../../store/card'
import { getAllLists } from '../../store/list'
import CardDetails from '../Card'
import ListForm from '../Forms/ListForm'

function ListDetails(list) {
    const dispatch = useDispatch()
    const [ name, setName ] = useState('')
    const [ showCardForm, setShowCardForm ] = useState(false)
    const cards = list.cards
    const {id} = useParams()

    const updateName = (e) => setName(e.target.value)

    const handleCardForm = () => setShowCardForm(!showCardForm)

    const handleCardSubmit = (e) => {
        e.preventDefault()
        const list_id = list.id
        const payload = {
            list_id,
            name
        }

        return dispatch(createCard(payload)).then(dispatch(getAllLists(id)))
        .then(() => {
            setName('')
            setShowCardForm(false)
        })
    }

    return (
        <div className='fdc g1'>
            <div className='fdr g1'>
                <ListForm {...list} />

            </div>
            <div>
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
    )
}

export default ListDetails
