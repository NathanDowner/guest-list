import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Guest } from '../models/guest.interface';

export interface GuestListState {
  finalList: Guest[];
  otherLists: Record<string, Guest[]>;
}

interface AddToListPayload {
  listName: string;
  guest: Guest;
}

const initialState: GuestListState = {
  finalList: [],
  otherLists: {},
};

export const guestListSlice = createSlice({
  name: 'guestList',
  initialState,
  reducers: {
    addGuest: (state, action: PayloadAction<AddToListPayload>) => {
      const { listName, guest } = action.payload;
      const list = state.otherLists[listName];
      if (list) {
        list.push(guest);
      } else {
        state.otherLists[listName] = [guest];
      }
    },
  },
});

export const { addGuest } = guestListSlice.actions;

// Selectors
export const selectFinalList = (state: RootState) =>
  state.guestList.otherLists.finalList;
export const selectList = (listName: string) => (state: RootState) =>
  state.guestList.otherLists[listName] || [];

export default guestListSlice.reducer;
