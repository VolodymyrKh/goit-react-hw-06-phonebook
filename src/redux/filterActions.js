import { type } from './defaultValues';
import { createAction } from '@reduxjs/toolkit';

// export const changeFilter = value => ({
//   type: type.CHANGEFILTER,
//   payload: value,
// });

export const changeFilter = createAction(type.CHANGEFILTER);
