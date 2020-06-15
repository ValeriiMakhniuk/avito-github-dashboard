import { createSlice } from '@reduxjs/toolkit';

import { displayTypes } from '../../constants';

const initialState = {
  repo: '',
  page: 1,
  displayType: displayTypes.REPO_LIST,
  activeRepoId: null,
};

const reposDisplaySlice = createSlice({
  name: 'reposDisplay',
  initialState,
  reducers: {
    setCurrentDisplayType(state, { payload }) {
      const { displayType, activeRepoId } = payload;
      state.displayType = displayType;
      state.activeRepoId = activeRepoId;
    },
    setCurrentPage(state, { payload }) {
      state.page = payload;
    },
    setRepo(state, { payload }) {
      state.repo = payload;
    },
  },
});

export const {
  setCurrentDisplayType,
  setCurrentPage,
  setRepo,
} = reposDisplaySlice.actions;

export default reposDisplaySlice.reducer;
