import { type } from './defaultValues';
import { initialState } from './defaultValues';

const contactReducer = (state = initialState.contacts, action) => {
  switch (action.type) {
    case type.ADDCONTACT:
      return [action.payload, ...state];

    case type.REMOVECONTACT:
      return [...state].filter(contact => contact.id !== action.payload);

    default:
      return state;
  }
};

export default contactReducer;
