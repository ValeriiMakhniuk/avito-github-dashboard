import React from 'react';

import styles from './LanguageList.module.css';

export function LanguageList({ languages, error }) {
  if (!languages) {
    return <p>Languages loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ul className={styles.list} aria-label="repository's languages">
      {Object.keys(languages).map((language) => {
        return (
          <li key={language} className={styles.languageItem}>
            {language}
          </li>
        );
      })}
    </ul>
  );
}
