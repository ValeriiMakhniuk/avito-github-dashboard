import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  repo: '',
  page: 1,
};

const reposDisplaySlice = createSlice({
  name: 'reposDisplay',
  initialState,
  reducers: {
    setCurrentPage(state, { payload }) {
      state.page = payload;
    },
    setRepo(state, { payload }) {
      state.repo = payload;
      state.page = 1;
    },
  },
});

export const {
  setCurrentDisplayType,
  setCurrentPage,
  setRepo,
} = reposDisplaySlice.actions;

export default reposDisplaySlice.reducer;
