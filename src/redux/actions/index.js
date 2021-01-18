//Text for the search
export const searchCounter = text => {
    return {
        type: 'SEARCH_COUNTER',
        payload: text,
    };
};

//new counter card open/close
export const newCounter = bool => {
    return {
        type: 'OPEN_NEW_COUNTER',
        payload: bool,
    };
};

//refreshing or not? 
export const refreshCounters = bool => {
    return {
        type: 'REFRESH_COUNTERS',
        payload: bool,
    };
};

//adding new counter created {id:xxx, title:yyy, count:zzzz}
export const sendNewCounter = counter => {
    return {
        type: 'SEND_NEW_COUNTER',
        payload: counter,
    };
};

//sending selected counters--id= {id: string, title: string}
export const selectedCounter = id => {
    return {
        type: 'SELECTED_COUNTERS',
        payload: id,
    };
};

//sending deselected counters--id= {id: string, title: string}
export const deselectedCounter = id => {
    return {
        type: 'DESELECTED_COUNTERS',
        payload: id,
    };
};

//Open/close Modal-- type = {type: string, isOpen: boolean}
export const handleModal = type => {
    return {
        type: 'HANDLE_MODAL',
        payload: type,
    };
};

//operations
export const operation = op => {
    return {
        type: 'OPERATION',
        payload: op,
    };
};