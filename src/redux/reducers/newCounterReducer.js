const newCounterReducer = (state = false, action) => {
    switch (action.type) {
        case 'OPEN_NEW_COUNTER':
            return action.payload;
        default:
            return state;
    }
}

export default newCounterReducer;