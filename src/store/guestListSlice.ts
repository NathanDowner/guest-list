import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Guest } from '../models/guest.interface';

export interface GuestListState {
  finalList: Guest[];
  otherLists: Record<string, Guest[]>;
}

// interface AlternativeState {
//   contributors: string[];
//   guestLists: Record<string, Guest[]>;
// }

interface AddToListPayload {
  listName: string;
  guest: Guest;
}

interface MoveWithinListPayload {
  listName: string;
  guestId: string;
  srcIndex: number;
  destIndex: number;
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

    reorderList: (state, action: PayloadAction<MoveWithinListPayload>) => {
      const { listName, guestId, srcIndex, destIndex } = action.payload;
      const list = state.otherLists[listName];

      const guest = list.find((guest) => guest.id === guestId);
      if (guest) {
        list.splice(srcIndex, 1);
        list.splice(destIndex, 0, guest);
      }
    },
  },
});

export const { addGuest, reorderList } = guestListSlice.actions;

// Selectors
export const selectFinalList = (state: RootState) =>
  state.guestList.otherLists.finalList;
export const selectList = (listName: string) => (state: RootState) =>
  state.guestList.otherLists[listName] || [];

export default guestListSlice.reducer;
