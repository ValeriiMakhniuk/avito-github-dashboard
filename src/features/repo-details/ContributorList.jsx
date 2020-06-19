import React from 'react';

import styles from './ContributorList.module.css';

import avatarPlaceholder from '../../img/github-logo.png';

export function ContributorList({ contributors, error }) {
  if (!contributors) {
    return <p>Loading contributors...</p>;
  }
  return (
    <ul className={styles.list}>
      {contributors.map(({ id, avatar_url, html_url }) => {
        const avatarUrl = avatar_url || avatarPlaceholder;

        return (
          <li key={id} className={styles.item}>
            <a
              href={html_url}
              className={styles.link}
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src={avatarUrl}
                alt="contributor's avatar"
                width='90'
                height='90'
                className={styles.avatar}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
