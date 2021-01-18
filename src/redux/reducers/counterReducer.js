const counterReducer = (state = '', action) => {
    switch (action.type) {
        case 'SEARCH_COUNTER':
            return action.payload;
        default:
            return state;
    }
}

export default counterReducer;