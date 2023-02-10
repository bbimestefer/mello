const CREATE = 'comments/CREATE'
const LOAD = 'comments/LOAD'
const UPDATE = 'comments/UPDATE'
const DELETE = 'comments/DELETE'

const load = comments => ({
    type: LOAD,
    comments
})

const create = comment => ({
    type: CREATE,
    comment
})

const update = comment => ({
    type: UPDATE,
    comment
})

const remove = id => ({
    type: DELETE,
    id
})

export const getAllComments = (cardId) => async dispatch => {
    const response = await fetch(`/api/cards/${cardId}/comments`)

    if(response.ok){
        const comments = await response.json()
        dispatch(load(comments))
        return comments
    }
}

// export const getCommentById = (commentId) => async dispatch => {
//     const response = await fetch(`/api/comments/${commentId}`)

//     if(response.ok){
//         const comment = await response.json()
//         dispatch(one(comment))
//         return comment
//     }
// }

export const createComment = (comment) => async dispatch => {
    const response = await fetch(`/api/comments/new`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(comment)
      })

    if(response.ok){
        const comment = await response.json()
        dispatch(create(comment))
        return comment
    }
}

export const updateComment = (comment) => async dispatch => {
    const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(comment)
      })

    if(response.ok){
        const comment = await response.json()
        dispatch(update(comment))
        return comment
    }
}

export const removeComment = (commentId) => async dispatch => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},
      })

    if(response.ok){
        const comment = await response.json()
        dispatch(remove(commentId))
        return comment
    }
}

const initialState = { comments: {} }

export default function reducer (state = initialState, action) {
    let newState;
    switch(action.type){
        case CREATE:
            return {...state, comments: {...state.comments, [action.comment.id]: action.comment} }
        case LOAD:
            newState = { comments: {} }
            action.comments.Comments.forEach(comment => {
                newState.comments[comment.id] = comment
            });
            return newState
        case UPDATE:
            newState = {...state, comments: { ...state.comments, [action.comment.id]: action.comment } }
            return newState
        case DELETE:
            newState = {...state, comments: {...state.comments } }
            if(newState.comments[action.id]) {
                delete newState.comments[action.id]
            }
            return newState
        default:
            return state
    }
}
