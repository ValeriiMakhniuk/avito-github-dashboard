import React from 'react';

import spinner from '../../img/spinner.gif';

import styles from './Spinner.module.css';

export function Spinner() {
  return <img src={spinner} alt='Loading' className={styles.spinner} />;
}
