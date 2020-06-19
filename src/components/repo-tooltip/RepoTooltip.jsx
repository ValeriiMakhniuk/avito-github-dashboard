import React from 'react';

import styles from './RepoTooltip.module.css';

export function RepoTooltip({ x, y, show }) {
  if (show) {
    return (
      <div
        style={{
          position: 'fixed',
          top: `${y + 10}px`,
          left: `${x + 10}px`,
        }}
        className={styles.tooltip}
      >
        <span>View repository's details</span>
      </div>
    );
  }
  return null;
}
