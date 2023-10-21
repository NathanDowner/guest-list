import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Guest } from '../models/guest.interface';
import { Contributor } from '@/models/contributor.interface';

export interface GuestListState {
  lists: Record<string, Guest[]>;
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

interface MoveAcrossListsPayload
  extends Omit<MoveWithinListPayload, 'listName'> {
  srcListName: string;
  destListName: string;
}

const initialState: GuestListState = {
  lists: { finalList: [] },
};

export const guestListSlice = createSlice({
  name: 'guestList',
  initialState,
  reducers: {
    createLists: (state, action: PayloadAction<Contributor[]>) => {
      const contributors = action.payload;
      contributors.forEach((contributor) => {
        state.lists[contributor.name] = [];
      });
    },

    addGuest: (state, action: PayloadAction<AddToListPayload>) => {
      const { listName, guest } = action.payload;
      const list = state.lists[listName];
      if (list) {
        list.push(guest);
      } else {
        state.lists[listName] = [guest];
      }
    },

    reorderList: (state, action: PayloadAction<MoveWithinListPayload>) => {
      const { listName, guestId, srcIndex, destIndex } = action.payload;
      const list = state.lists[listName];

      const guest = list.find((guest) => guest.id === guestId);
      if (guest) {
        list.splice(srcIndex, 1);
        list.splice(destIndex, 0, guest);
      }
    },

    moveAcrossList: (state, action: PayloadAction<MoveAcrossListsPayload>) => {
      const { srcListName, srcIndex, destListName, destIndex, guestId } =
        action.payload;
      const srcList = state.lists[srcListName];
      const destList = state.lists[destListName];

      const guest = srcList.find((guest) => guest.id === guestId);
      if (guest) {
        srcList.splice(srcIndex, 1);
        destList.splice(destIndex, 0, guest);
      }
    },
  },
});

export const { addGuest, reorderList, moveAcrossList, createLists } =
  guestListSlice.actions;

// Selectors
export const selectFinalList = (state: RootState) =>
  state.guestList.lists.finalList;
export const selectList = (listName: string) => (state: RootState) =>
  state.guestList.lists[listName] || [];

export default guestListSlice.reducer;
