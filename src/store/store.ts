import { configureStore } from '@reduxjs/toolkit';
import guestList from './guestListSlice';
import contributors from './contributorSlice';

export const store = configureStore({
  reducer: {
    guestList,
    contributors,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
