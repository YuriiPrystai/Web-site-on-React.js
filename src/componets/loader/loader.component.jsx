import React from 'react';
import Loader from 'react-loader-spinner';

import styles from './loader.module.scss'

const NewLoader =  () => (
  <Loader className={styles.loader} color="#bb7a7a" type="TailSpin" />
)

export default NewLoader;