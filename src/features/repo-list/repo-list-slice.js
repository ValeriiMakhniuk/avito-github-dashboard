import { createSlice } from '@reduxjs/toolkit';

import { getRepoList, getRepo, getTopRatedRepos } from '../../api/githubAPI';

const reposInitialState = {
  byId: {},
  currentPageRepos: [],
  pageCount: 0,
  isLoading: false,
  error: null,
};

function startLoading(state) {
  state.isLoading = true;
}

function loadingFailed(state, action) {
  state.isLoading = false;
  state.error = action.payload;
}

const repos = createSlice({
  name: 'repos',
  initialState: reposInitialState,
  reducers: {
    getRepoStart: startLoading,
    getReposStart: startLoading,
    getTopReposStart: startLoading,
    getRepoSuccess(state, { payload }) {
      const { id } = payload;
      state.byId[id] = payload;
      state.isLoading = false;
      state.error = null;
    },
    getTopReposSucess(state, { payload }) {
      const repos = payload;
      state.isLoading = false;
      state.error = null;

      repos.forEach((repo) => {
        state.byId[repo.id] = repo;
      });

      state.currentPageRepos = repos.map((repo) => repo.id);
    },
    getReposSuccess(state, { payload }) {
      const { pageCount, repos } = payload;
      state.pageCount = pageCount;
      state.isLoading = false;
      state.error = null;

      repos.forEach((repo) => {
        state.byId[repo.id] = repo;
      });

      state.currentPageRepos = repos.map((repo) => repo.id);
    },
    getRepoFailure: loadingFailed,
    getReposFailure: loadingFailed,
    getTopReposFailure: loadingFailed,
  },
});

export const {
  getReposStart,
  getReposSuccess,
  getTopReposStart,
  getTopReposSucess,
  getRepoStart,
  getRepoSuccess,
  getRepoFailure,
  getReposFailure,
  getTopReposFailure,
} = repos.actions;

export default repos.reducer;

export const fetchRepos = (repo, page) => async (dispatch) => {
  try {
    dispatch(getReposStart());
    const repos = await getRepoList(repo, page);
    dispatch(getReposSuccess(repos));
  } catch (err) {
    dispatch(getReposFailure(err.toString()));
  }
};

export const fetchRepo = (id) => async (dispatch) => {
  try {
    dispatch(getRepoStart());
    const repo = await getRepo(id);
    dispatch(getRepoSuccess(repo));
  } catch (err) {
    dispatch(getRepoFailure(err.toString()));
  }
};

export const fetchTopRepos = () => async (dispatch) => {
  try {
    dispatch(getTopReposStart());
    const repos = await getTopRatedRepos();
    dispatch(getTopReposSucess(repos));
  } catch (err) {
    dispatch(getTopReposFailure(err.toString()));
  }
};
