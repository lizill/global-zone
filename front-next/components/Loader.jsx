import React from 'react'

import styles from '../styles/layout/Loader.module.scss'

const Loader = () => {
  return (
    <div className={styles.wrapper}>
        <div className={styles.circle}/>
        <div className={styles.circle}/>
        <div className={styles.circle}/>
        <div className={styles.shadow}/>
        <div className={styles.shadow}/>
        <div className={styles.shadow}/>
        <span>Loading</span>
    </div>
  )
}

export default Loader
