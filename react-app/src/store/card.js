const CREATE = 'cards/CREATE'
const ONE = 'cards/ONE'
const LOAD = 'cards/LOAD'
const UPDATE = 'cards/UPDATE'
const DELETE = 'cards/DELETE'

// const load = cards => ({
//     type: LOAD,
//     cards
// })

const one = card => ({
    type: ONE,
    card
})

const create = card => ({
    type: CREATE,
    card
})

const update = card => ({
    type: UPDATE,
    card
})

const remove = id => ({
    type: DELETE,
    id
})

// export const getAllCards = () => async dispatch => {
//     const response = await fetch(`/api/cards`)

//     if(response.ok){
//         const cards = await response.json()
//         dispatch(load(cards))
//         return cards
//     }
// }

export const getCardById = (cardId) => async dispatch => {
    const response = await fetch(`/api/cards/${cardId}`)

    if(response.ok){
        const card = await response.json()
        dispatch(one(card))
        return card
    }
}

export const createCard = (card) => async dispatch => {
    const response = await fetch(`/api/cards/new`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(card)
      })

    if(response.ok){
        const card = await response.json()
        dispatch(create(card))
        return card
    }
}

export const updateCard = (card) => async dispatch => {
    const response = await fetch(`/api/cards/${card.id}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(card)
      })

    if(response.ok){
        const card = await response.json()
        dispatch(update(card))
        return card
    }
}

export const removeCard = (cardId) => async dispatch => {
    const response = await fetch(`/api/cards/${cardId}`, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},
      })

    if(response.ok){
        const card = await response.json()
        dispatch(remove(cardId))
        return card
    }
}

const initialState = { cards: {}, singleCard: {} }

export default function reducer (state = initialState, action) {
    let newState;
    switch(action.type){
        case CREATE:
            return {...state, cards: {...state.cards, [action.card.id]: action.card} }
        case ONE:
            newState = {...state, cards: {...state.cards} }
            newState.singlecard = action.card
            return newState
        case LOAD:
            newState = {...state, cards: {...state.cards} }
            action.cards.Cards.forEach(card => {
                newState.cards[card.id] = card
            });
            return newState
        case UPDATE:
            newState = {...state, cards: { ...state.cards, [action.card.id]: action.card }, singleCard: {...state.singleCard} }
            if(newState.singleCard[action.card.id]) newState.singleCard[action.card.id] = action.card
            return newState
        case DELETE:
            newState = {...state, cards: {...state.cards } }
            if(newState.cards[action.id]) {
                delete newState.cards[action.id]
            }
            return newState
        default:
            return state
    }
}
