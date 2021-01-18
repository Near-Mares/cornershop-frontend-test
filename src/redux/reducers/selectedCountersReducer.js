const selectedCountersReducer = (state = [], action) => {
    switch (action.type) {
        case 'SELECTED_COUNTERS':
            console.log(`adding ${action.payload.id} to selected list`)
            return [...state, action.payload];
        case 'DESELECTED_COUNTERS':
            console.log(`trying to remove ${action.payload.id}`)
            return state.filter( counter => counter.id !== action.payload.id)
        default:
            return state;
    }
}

export default selectedCountersReducer;