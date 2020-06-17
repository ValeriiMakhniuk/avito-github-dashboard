import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchRepos, fetchTopRepos } from './repo-list-slice';

import { RepoList } from './RepoList';

export function RepoListPage({ jumpToPage, showRepoDetails, repo, page }) {
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

  const currentPage = Math.min(pageCount, Math.max(page, 1)) - 1;

  let renderedList = isLoading ? (
    <h3>Loading...</h3>
  ) : (
    <RepoList repos={repos} showRepoDetails={showRepoDetails} />
  );

  const onPageChanged = (selectedItem) => {
    const newPage = selectedItem.selected + 1;
    jumpToPage(newPage);
  };

  return renderedList;
}
