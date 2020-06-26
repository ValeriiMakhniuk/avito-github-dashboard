import React from 'react';

import styles from './Paginator.module.css';

export function Paginator({ activePage, totalPages, itemsPerPage, jumToPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPages / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => () => {
    jumToPage(pageNumber);
  };

  return (
    <nav className={styles.paginator}>
      <ul className={styles.list}>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className={styles.item}>
            <button
              type='button'
              onClick={handlePageClick(pageNumber)}
              className={
                activePage === pageNumber ? styles.active : styles.pageBtn
              }
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
