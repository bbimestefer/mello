const LOAD = 'labels/LOAD'
// const DELETE = 'labels/DELETE'

const load = labels => ({
    type: LOAD,
    labels
})

export const getAllLabels = () => async dispatch => {
    const response = await fetch(`/api/cards/labels`)

    if(response.ok){
        const labels = await response.json()
        dispatch(load(labels))
        return labels
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
