import React from "react";

import styles from '../../styles/schedule/schedule.module.scss';

const DotsComponent = () => {
  return (
    <div className={styles.dotsWrap}>
      <div className={styles.en}/>
      <div className={styles.jp}/>
      <div className={styles.ch}/>
    </div>
  )
}

export default DotsComponent;
