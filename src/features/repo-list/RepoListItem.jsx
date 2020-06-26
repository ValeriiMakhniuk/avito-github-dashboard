import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { formatToNow } from '../../utils/dates.js';

import { RepoTooltip } from '../../components/repo-tooltip/RepoTooltip';
import { Star } from '../../components/shared/Star';
import { Repo } from '../../components/shared/Repo';

import styles from './RepoListItem.module.css';

export const RepoListItem = ({ repo }) => {
  const { id, full_name, stargazers_count, pushed_at, html_url } = repo;
  const [isMouseEnter, setMouseEnter] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(null);

  const handleMouseMove = (e) => {
    setMouseEnter(true);
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = (e) => {
    setMouseEnter(false);
  };

  const lastCommitDate = new Date(pushed_at);

  const [owner, repoName] = full_name.split('/');

  return (
    <li className={styles.repoItem}>
      <div className={styles.repoHeader}>
        <RepoTooltip {...cursorPosition} show={isMouseEnter} />
        <Link
          to={`/repo/${id}`}
          className={styles.repoTitle}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <Repo width={16} height={16} />
          {owner}/<span className={styles.repoName}>{repoName}</span>
        </Link>
        <p className={styles.repoStars}>
          <Star width={16} height={16} />
          {stargazers_count}
        </p>
      </div>
      <p className={styles.repoCommit}>
        Last commit: {formatToNow(lastCommitDate)}
      </p>
      <p>
        Repo Link:
        <a href={html_url} target='_blank' rel='noopener noreferrer'>
          {html_url}
        </a>
      </p>
    </li>
  );
};
