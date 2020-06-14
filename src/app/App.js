import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveState } from '../utils/localStorage';

import {
  setCurrentDisplayType,
  setCurrentPage,
  setRepo,
} from '../features/repos-display/repos-display-slice';

import { displayTypes } from '../constants';

import { Logo } from '../components/logo/Logo';
import { RepoSearchForm } from '../features/repo-search/RepoSearchForm';
import RepoListPage from '../features/repo-list/repo-list-page';

import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();

  const { repo, page, displayType, activeRepoId } = useSelector(
    (state) => state.reposDisplay
  );

  const showRepoDetails = (repoId) => {
    dispatch(
      setCurrentDisplayType({
        displayType: displayTypes.REPO_DETAILS,
        activeRepoId: repoId,
      })
    );
  };

  const showRepoList = () => {
    dispatch(
      setCurrentDisplayType({
        displayType: displayTypes.REPO_LIST,
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

  let content;

  if (displayType === displayTypes.REPO_LIST) {
    content = (
      <RepoListPage
        jumpToPage={jumpToPage}
        showRepoDetails={showRepoDetails}
        repo={repo}
        page={page}
      />
    );
  }

  // if (displayType === displayTypes.REPO_DETAILS) {
  //   content = (
  //     <RepoDetailsPage
  //       showRepoList={showRepoList}
  //       activeRepoId={activeRepoId}
  //     />
  //   );
  // }

  return (
    <div className='App'>
      <header className={styles.header}>
        <Logo />
        <RepoSearchForm
          value={repo}
          setSearchedRepo={setSearchedRepo}
          saveRepoToLocalStorage={saveRepoToLocalStorage}
        />
      </header>
      {content}
    </div>
  );
}

export default App;
