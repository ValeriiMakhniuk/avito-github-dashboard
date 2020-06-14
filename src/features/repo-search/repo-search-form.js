import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

import styles from './repo-search-form.module.css';

export default function RepoSearhForm({
  value,
  setSearchedRepo,
  saveRepoToLocalStorage,
}) {
  const [searchTerm, setSearchTerm] = useState(value);
  const debounced = useDebounce(searchTerm, 1000);

  const handleSearch = ({ target: { value } }) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    if (debounced !== value) {
      setSearchedRepo(debounced);
    }
    saveRepoToLocalStorage(debounced);
  }, [debounced, setSearchedRepo, saveRepoToLocalStorage, value]);

  return (
    <form action='/' className={styles.searchForm}>
      <label htmlFor='search' className={styles.label}>
        Search repositories
      </label>
      <input
        type='text'
        value={searchTerm}
        onChange={handleSearch}
        id='search'
        className={styles.input}
        placeholder='Search'
      />
    </form>
  );
}
