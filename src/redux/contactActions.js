import { type } from './defaultValues';

export const addContact = contactToAdd => ({
  type: type.ADDCONTACT,
  payload: contactToAdd,
});

export const removeContact = contactIdToRemove => ({
  type: type.REMOVECONTACT,
  payload: contactIdToRemove,
});

export const existContact = () => ({
  type: type.EXISTCONTACT,
});
