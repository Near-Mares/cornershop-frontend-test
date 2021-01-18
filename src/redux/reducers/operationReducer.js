const operationReducer = (state = {}, action) => {
    switch (action.type) {
        case 'OPERATION':
            return action.payload;
        default:
            return state;
    }
}

export default operationReducer;