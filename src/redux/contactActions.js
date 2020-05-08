import { type } from './defaultValues';
import { createAction } from '@reduxjs/toolkit';

// export const addContact = contactToAdd => ({
//   type: type.ADDCONTACT,
//   payload: contactToAdd,
// });

// export const removeContact = contactIdToRemove => ({
//   type: type.REMOVECONTACT,
//   payload: contactIdToRemove,
// });

export const addContact = createAction(type.ADDCONTACT);
export const removeContact = createAction(type.REMOVECONTACT);



