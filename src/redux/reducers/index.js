import counterReducer from './counterReducer';
import newCounterReducer from './newCounterReducer';
import refreshCountersReducer from './refreshCountersReducer';
import sendNewCounterReducer from './sendCounterReducer';
import selectedCountersReducer from './selectedCountersReducer';
import handleModalReducer from './handleModalReducer';
import operationReducer from './operationReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    counter: counterReducer,
    newCounter: newCounterReducer,
    refreshCounters: refreshCountersReducer,
    sendNewCounter: sendNewCounterReducer,
    selectedCounters: selectedCountersReducer,
    handleModal: handleModalReducer,
    operation: operationReducer,
});

export default allReducers;