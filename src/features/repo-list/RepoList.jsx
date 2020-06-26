import React from 'react';

import styles from './RepoList.module.css';

import { RepoListItem } from './RepoListItem';

export const RepoList = ({ repos }) => {
  const renderedIssues = repos.map((repo) => (
    <RepoListItem repo={repo} key={repo.id} />
  ));

  return <ul className={styles.list}>{renderedIssues}</ul>;
};
