import React, { memo } from "react";

import styles from '../../styles/schedule/schedule.module.scss';

const DotsComponent = ({ list }) => {
  return (
    <div className={styles.dotsWrap}>
      {list.filter(v => v.user.position === 'en').length !== 0 &&
        <div style={{ backgroundColor: "#4d4cac" }}/>}
      {list.filter(v => v.user.position === 'ja').length !== 0 &&
        <div style={{ backgroundColor: "#659cff" }}/>}
      {list.filter(v => v.user.position === 'ch').length !== 0 &&
        <div style={{ backgroundColor: "#ff6565" }}/>}
    </div>
  )
}

export default memo(DotsComponent);
