import React from 'react';

import spinner from '../../img/91.gif';

import styles from './Spinner.module.css';

export function Spinner() {
  return <img src={spinner} alt='Loading' className={styles.spinner} />;
}
