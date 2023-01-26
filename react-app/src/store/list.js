const CREATE = 'lists/CREATE'
const LOAD = 'lists/LOAD'
const UPDATE = 'lists/UPDATE'
const DELETE = 'lists/CREATE'

const create = list => ({
    type: CREATE,
    list
})

const load = lists => ({
    type: LOAD,
    lists
})

const update = list => ({
    type: UPDATE,
    list
})

const remove = id => ({
    type: DELETE,
    id
})


export const getAllLists = (boardId) => async dispatch => {
    const response = await fetch(`/api/boards/${boardId}/lists`)

    if(response.ok){
        const lists = await response.json()
        dispatch(load(lists))
        return lists
    }
}


export const createList = (list) => async dispatch => {
    const response = await fetch(`/api/lists/new`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(list)
      })

    if(response.ok){
        const list = await response.json()
        dispatch(create(list))
        return list
    }
}


export const updateList = (list) => async dispatch => {
    const response = await fetch(`/api/lists/${list.id}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(list)
      })

    if(response.ok){
        const list = await response.json()
        dispatch(update(list))
        return list
    }
}


export const removeList = (listId) => async dispatch => {
    const response = await fetch(`/api/lists/${listId}`, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},
      })

    if(response.ok){
        const list = await response.json()
        dispatch(remove(listId))
        return list
    }
}

const initialState = { lists: {} }

export default function reducer (state = initialState, action) {
    let newState;
    switch(action.type){
        case CREATE:
            return {...state, boardLists: {...state.boardLists, [action.list.id]: action.list} }
        case LOAD:
            newState = {...state, boardLists: {} }
            action.lists.Lists.forEach(list => {
                newState.boardLists[list.id] = list
            });
            return newState
        case UPDATE:
            newState = {...state, boardLists: { ...state.boardLists, [action.list.id]: action.list } }
            if(newState.singlelist[action.list.id]) newState.singlelist[action.list.id] = action.list
            return newState
        case DELETE:
            newState = {...state, boardLists: {...state.boardLists } }
            if(newState.boardLists[action.id]) delete newState.boardLists[action.id]
            return newState
        default:
            return state
    }
}
