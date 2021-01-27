const selectedCountersReducer = (state = [], action) => {
    switch (action.type) {
        case 'SELECTED_COUNTERS':
            return [...state, action.payload];
        case 'DESELECTED_COUNTERS':
            return state.filter( counter => counter.id !== action.payload.id)
        default:
            return state;
    }
}

export default selectedCountersReducer;