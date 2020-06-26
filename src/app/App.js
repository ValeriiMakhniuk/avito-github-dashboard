import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveState } from '../utils/localStorage';

import {
  setCurrentDisplayType,
  setCurrentPage,
  setRepo,
} from '../features/repos-display/repos-display-slice';

import { RepoListPage } from '../features/repo-list/RepoListPage';
import { RepoDetailsPage } from '../features/repo-details/RepoDetailsPage';

import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();

  const { repo, page, displayType, activeRepoId } = useSelector(
    (state) => state.reposDisplay
  );

  const showRepoDetails = (repoId) => {
    dispatch(
      setCurrentDisplayType({
        activeRepoId: repoId,
      })
    );
  };

  const jumpToPage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const setSearchedRepo = (repo) => {
    dispatch(setRepo(repo));
  };

  const saveRepoToLocalStorage = (repo) => {
    saveState({
      reposDisplay: {
        repo,
        page,
        displayType,
        activeRepoId,
      },
    });
  };

  const savePageToLocalStorage = (page) => {
    saveState({
      reposDisplay: {
        repo,
        page,
        displayType,
        activeRepoId,
      },
    });
  };

  return (
    <div className={styles.app}>
      <Router>
        <Route exact path='/'>
          <RepoListPage
            jumpToPage={jumpToPage}
            showRepoDetails={showRepoDetails}
            repo={repo}
            page={page}
            setSearchedRepo={setSearchedRepo}
            saveRepoToLocalStorage={saveRepoToLocalStorage}
          />
        </Route>
        <Route exact path='/repo/:repoId' component={RepoDetailsPage}></Route>
      </Router>
    </div>
  );
}

export default App;
