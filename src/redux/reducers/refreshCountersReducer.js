const refreshCountersReducer = (state = false, action) => {
    switch (action.type) {
        case 'REFRESH_COUNTERS':
            return action.payload;
        default:
            return state;
    }
}

export default refreshCountersReducer;