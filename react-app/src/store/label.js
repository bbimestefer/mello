const LOAD = 'labels/LOAD'
// const DELETE = 'labels/DELETE'

const load = labels => ({
    type: LOAD,
    labels
})

export const getAllLabels = () => async dispatch => {
    const response = await fetch(`/api/labels`)

    if(response.ok){
        const labels = await response.json()
        dispatch(load(labels))
        return labels
    }
}

export const createLabelForCard = (labelId, cardId) => async dispatch => {
    const response = await fetch(`/api/labels/${labelId}/label/${cardId}`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"}
      })

    if(response.ok) {
        const label = await response.json()
        return label
    }
}

export const deleteLabelForCard = (labelId, cardId) => async dispatch => {
    const response = await fetch(`/api/labels/${labelId}/label/${cardId}`, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"}
      })

    if(response.ok) {
        const label = await response.json()
        return label
    }
}

const initialState = { labels: {} }

export default function reducer (state = initialState, action) {
    let newState;
    switch(action.type){
        case LOAD:
            newState = {...state, labels: {...state.labels} }
            action.labels.Labels.forEach(label => {
                newState.labels[label.id] = label
            });
            return newState
        default:
            return state
    }
}
