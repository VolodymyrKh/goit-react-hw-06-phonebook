import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import contactReducer from './contactReducer';
import contactExistReducer from './contactExistReduser'

const rootReducer = combineReducers({
    contacts: contactReducer,
    existContact: contactExistReducer,
})

const store = createStore(rootReducer, devToolsEnhancer());

export default store;