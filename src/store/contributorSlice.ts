// create a redux slice for contributor list management

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Contributor } from '../models/contributor.interface';
import { RootState } from './store';

interface AddContributorPayload {
  name: string;
  id: string;
}

interface RemoveContributorPayload {
  id: string;
}

interface ContributorsState {
  contributors: Contributor[];
}

const initialState: ContributorsState = {
  contributors: [
    { name: 'John', id: '1' },
    { name: 'Jane', id: '2' },
  ],
};

export const contributorsSlice = createSlice({
  name: 'contributors',
  initialState,
  reducers: {
    addContributor: (state, action: PayloadAction<AddContributorPayload>) => {
      state.contributors.push(action.payload);
    },
    removeContributor: (
      state,
      action: PayloadAction<RemoveContributorPayload>
    ) => {
      const { id } = action.payload;
      state.contributors = state.contributors.filter(
        (contributor) => contributor.id !== id
      );
    },
  },
});

export const { addContributor, removeContributor } = contributorsSlice.actions;

// Selectors
export const selectContributors = (state: RootState) =>
  state.contributors.contributors;

export default contributorsSlice.reducer;
