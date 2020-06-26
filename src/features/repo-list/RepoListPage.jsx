import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchRepos, fetchTopRepos } from './repo-list-slice';

import { REPOS_PER_PAGE } from '../../constants';

import { Logo } from '../../components/logo/Logo';
import { RepoSearchForm } from '../repo-search/RepoSearchForm';
import { RepoList } from './RepoList';
import { Paginator } from '../../components/paginator/Paginator';
import { Spinner } from '../../components/shared/Spinner';

import styles from './RepoListPage.module.css';

function RepoListHeader({ repo, setSearchedRepo, saveRepoToLocalStorage }) {
  return (
    <header className={styles.header}>
      <Logo />
      <RepoSearchForm
        value={repo}
        setSearchedRepo={setSearchedRepo}
        saveRepoToLocalStorage={saveRepoToLocalStorage}
      />
    </header>
  );
}

export function RepoListPage({
  jumpToPage,
  showRepoDetails,
  repo,
  page,
  setSearchedRepo,
  saveRepoToLocalStorage,
}) {
  const dispatch = useDispatch();
  const {
    currentPageRepos,
    isLoading,
    error: reposError,
    byId,
    pageCount,
  } = useSelector((state) => state.repos);

  const repos = currentPageRepos.map((id) => byId[id]);

  useEffect(() => {
    if (repo === '') {
      dispatch(fetchTopRepos());
    } else {
      dispatch(fetchRepos(repo, page));
    }
  }, [repo, page, dispatch]);

  if (reposError) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{reposError}</div>
      </div>
    );
  }

  let renderedList = isLoading ? (
    <Spinner />
  ) : (
    <RepoList repos={repos} showRepoDetails={showRepoDetails} />
  );

  return (
    <>
      <RepoListHeader
        setSearchedRepo={setSearchedRepo}
        saveRepoToLocalStorage={saveRepoToLocalStorage}
        repo={repo}
      />
      <main className={styles.main}>
        <div className='wrapper'>{renderedList}</div>
        {!isLoading && (
          <Paginator
            totalPages={pageCount}
            itemsPerPage={REPOS_PER_PAGE}
            jumToPage={jumpToPage}
            activePage={page}
          />
        )}
      </main>
    </>
  );
}
