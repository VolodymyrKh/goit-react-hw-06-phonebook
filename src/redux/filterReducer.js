// import { type } from './defaultValues';
import { initialState } from './defaultValues';
import { createReducer } from '@reduxjs/toolkit';
import {changeFilter} from './filterActions'

// const filterReducer = (state = initialState.filter, action) => {
//   switch (action.type) {
//     case type.CHANGEFILTER:
//       return action.payload;

//       default:
//       return state;
//   }
// };

const filterReducer = createReducer(initialState.filter, {
  [changeFilter]: (state, action) => action.payload
  
});

export default filterReducer;
