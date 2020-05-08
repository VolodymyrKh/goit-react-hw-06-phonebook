// import { type } from './defaultValues';
import { initialState } from './defaultValues';
import { createReducer } from '@reduxjs/toolkit';
import { addContact, removeContact } from './contactActions';

// const contactReducer = (state = initialState.contacts, action) => {
//   switch (action.type) {
//     case type.ADDCONTACT:
//       return [action.payload, ...state];

//     case type.REMOVECONTACT:
//       return [...state].filter(contact => contact.id !== action.payload);

//     default:
//       return state;
//   }
// };

const contactReducer = createReducer(initialState.contacts, {
  [addContact]: (state, action) => [action.payload, ...state],
  [removeContact]: (state, action) =>
    [...state].filter(contact => contact.id !== action.payload),
});

export default contactReducer;
