import { type } from './defaultValues';
import { initialState } from './defaultValues';

const contactExistReducer = (state = initialState.existContact, action) => {
  switch (action.type) {
    case type.EXISTCONTACT:
      return !state;

    default:
      return state;
  }
};

export default contactExistReducer;
