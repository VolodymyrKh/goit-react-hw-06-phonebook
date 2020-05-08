// import { createStore } from 'redux';
// import { devToolsEnhancer } from 'redux-devtools-extension';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contactReducer';
import filterReducer from './filterReducer';

const rootReducer = combineReducers({
  contacts: contactReducer,
  filter: filterReducer,
});

// const store = createStore(rootReducer, devToolsEnhancer());

const store = configureStore({
  reducer: rootReducer,
});

export default store;
