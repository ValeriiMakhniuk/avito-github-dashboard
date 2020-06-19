import { createSlice } from '@reduxjs/toolkit';

import { getRepoContributors } from '../../api/githubAPI';

const initialState = {
  byRepoId: {},
  isLoading: false,
  error: null,
};

const contributors = createSlice({
  name: 'contributors',
  initialState,
  reducers: {
    getContributorsStart(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    getContributorsSucess(state, { payload }) {
      const { repoId, contributors } = payload;
      state.byRepoId[repoId] = contributors;
      state.isLoading = false;
      state.error = null;
    },
    getContributorsFailure(state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const {
  getContributorsStart,
  getContributorsSucess,
  getContributorsFailure,
} = contributors.actions;

export default contributors.reducer;

export const fetchRepoContributors = (repoId) => async (dispatch) => {
  try {
    dispatch(getContributorsStart());
    const contributors = await getRepoContributors(repoId);
    dispatch(getContributorsSucess({ repoId, contributors }));
  } catch (err) {
    dispatch(getContributorsFailure(err.toString()));
  }
};
