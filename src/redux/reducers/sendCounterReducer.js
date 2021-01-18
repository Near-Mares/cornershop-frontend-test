const sendNewCounterReducer = ( state = {}, action ) => {
    switch (action.type) {
        case 'SEND_NEW_COUNTER':
            return action.payload;
        default:
            return state;
    }
}

export default sendNewCounterReducer;