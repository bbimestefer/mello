// constants

const CREATE = 'boards/CREATE'
const ONE = 'boards/ONE'
const LOAD = 'boards/LOAD'
const UPDATE = 'boards/UPDATE'
const DELETE = 'boards/DELETE'

const load = boards => ({
    type: LOAD,
    boards
})

const one = board => ({
    type: ONE,
    board
})

const create = board => ({
    type: CREATE,
    board
})

const update = board => ({
    type: UPDATE,
    board
})

const remove = id => ({
    type: DELETE,
    id
})

export const getAllBoards = () => async dispatch => {
    const response = await fetch(`/api/boards`)

    if(response.ok){
        const boards = await response.json()
        dispatch(load(boards))
        return boards
    }
}

export const getBoardById = (boardId) => async dispatch => {
    const response = await fetch(`/api/boards/${boardId}`)

    if(response.ok){
        const board = await response.json()
        dispatch(one(board))
        return board
    }
}

export const createBoard = (board) => async dispatch => {
    const response = await fetch(`/api/boards/new`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(board)
      })

    if(response.ok){
        const board = await response.json()
        dispatch(create(board))
        return board
    }
}

export const updateBoard = (board) => async dispatch => {
    const response = await fetch(`/api/boards/${board.id}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(board)
      })

    if(response.ok){
        const board = await response.json()
        dispatch(update(board))
        return board
    }
}

export const removeBoard = (boardId) => async dispatch => {
    const response = await fetch(`/api/boards/${boardId}`, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},
      })

    if(response.ok){
        const board = await response.json()
        dispatch(remove(boardId))
        return board
    }
}

const initialState = { userBoards: {}, singleBoard: {} }

export default function reducer (state = initialState, action) {
    let newState;
    switch(action.type){
        case CREATE:
            return {...state, userBoards: {...state.userBoards, [action.board.id]: action.board} }
        case ONE:
            newState = {...state, userBoards: {...state.userBoards} }
            newState.singleBoard = action.board
            return newState
        case LOAD:
            newState = {...state, userBoards: {...state.userBoards} }
            action.boards.Boards.forEach(board => {
                newState.userBoards[board.id] = board
            });
            return newState
        case UPDATE:
            newState = {...state, userBoards: { ...state.userBoards, [action.board.id]: action.board }, singleBoard: {...state.singleBoard} }
            if(newState.singleBoard[action.board.id]) newState.singleBoard[action.board.id] = action.board
            return newState
        case DELETE:
            newState = {...state, userBoards: {...state.userBoards } }
            console.log("IN THE DELETE CASE")
            if(newState.userBoards[action.id]) {
                console.log("BOARD IM LOOKING FOR", newState.userBoards[action.id])
                delete newState.userBoards[action.id]
                console.log("STATE AFTER", newState)
            }
            console.log("DONE THE DELETE CASE")
            return newState
        default:
            return state
    }
}
