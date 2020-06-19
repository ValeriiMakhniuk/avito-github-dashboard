import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

import styles from './RepoSearchForm.module.css';

export function RepoSearchForm({
  value,
  setSearchedRepo,
  saveRepoToLocalStorage,
}) {
  const [searchTerm, setSearchTerm] = useState(value);
  const debounced = useDebounce(searchTerm, 1000);

  const searchInput = useRef(null);

  const handleSearch = ({ target: { value } }) => {
    setSearchTerm(value);
  };

  const handleFocus = ({ target }) => {
    target.select();
  };

  useEffect(() => {
    if (debounced !== value) {
      setSearchedRepo(debounced);
    }
    saveRepoToLocalStorage(debounced);
  }, [debounced, setSearchedRepo, saveRepoToLocalStorage, value]);

  useEffect(() => {
    if (searchInput) {
      searchInput.current.focus();
    }
  }, []);

  return (
    <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
      <label htmlFor='search' className={styles.label}>
        Search repositories
      </label>
      <input
        type='text'
        value={searchTerm}
        onChange={handleSearch}
        id='search'
        className={styles.input}
        placeholder='Search repository'
        ref={searchInput}
        onFocus={handleFocus}
      />
    </form>
  );
}
