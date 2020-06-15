import React from 'react';

import styles from './RepoList.module.css';

import { RepoListItem } from './RepoListItem';

export const RepoList = ({ repos, showRepoDetails }) => {
  const renderedIssues = repos.map((repo) => (
    <RepoListItem repo={repo} showRepoDetails={showRepoDetails} key={repo.id} />
  ));

  return <ul className={styles.list}>{renderedIssues}</ul>;
};
