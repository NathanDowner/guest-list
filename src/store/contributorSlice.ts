// create a redux slice for contributor list management

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Contributor } from '../models/contributor.interface';
import { RootState } from './store';

interface ContributorsState {
  contributors: Contributor[];
}

const initialState: ContributorsState = {
  contributors: [],
};

export const contributorsSlice = createSlice({
  name: 'contributors',
  initialState,
  reducers: {
    addContributor: (state, action: PayloadAction<Contributor>) => {
      state.contributors.push(action.payload);
    },
    bulkAddContributors: (state, action: PayloadAction<Contributor[]>) => {
      state.contributors = action.payload;
    },
  },
});

export const { addContributor, bulkAddContributors } =
  contributorsSlice.actions;

// Selectors
export const selectContributors = (state: RootState) =>
  state.contributors.contributors;

export default contributorsSlice.reducer;
