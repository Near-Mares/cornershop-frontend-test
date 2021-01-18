const handleModalReducer = (state = {}, action) => {
    switch (action.type) {
        case 'HANDLE_MODAL':
            return action.payload;
        default:
            return state;
    }
}

export default handleModalReducer;