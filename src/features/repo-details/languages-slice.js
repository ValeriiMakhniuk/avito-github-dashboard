import { createSlice } from '@reduxjs/toolkit';

import { getRepoLanguages } from '../../api/githubAPI';

const initialState = {
  byRepoId: {},
  isLoading: false,
  error: null,
};

const languages = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    getLanguagesStart(state, action) {
      state.isLoading = true;
      state.error = null;
    },
    getLanguagesSucess(state, { payload }) {
      const { repoId, languages } = payload;
      state.byRepoId[repoId] = languages;
      state.isLoading = false;
      state.error = null;
    },
    getLanguagesFailure(state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const {
  getLanguagesStart,
  getLanguagesSucess,
  getLanguagesFailure,
} = languages.actions;

export default languages.reducer;

export const fetchRepoLanguages = (repoId) => async (dispatch) => {
  try {
    dispatch(getLanguagesStart());
    const languages = await getRepoLanguages(repoId);
    dispatch(getLanguagesSucess({ repoId, languages }));
  } catch (err) {
    dispatch(getLanguagesFailure(err.toString()));
  }
};
