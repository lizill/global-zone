import React, { memo } from "react";

import styles from '../../styles/schedule/schedule.module.scss';

const DotsComponent = ({ list }) => {
  return (
    <div className={styles.dotsWrap}>
      {list.filter(v => v.user.position === 'american').length !== 0 &&
        <div style={{ backgroundColor: "#182f9e" }}></div>}
      {list.filter(v => v.user.position === 'japanese').length !== 0 &&
      <div style={{ backgroundColor: "#659cff" }}></div>}
      {list.filter(v => v.user.position === 'chinese').length !== 0 &&
      <div style={{ backgroundColor: "#ff6565" }}></div>}
    </div>
  )
}

export default memo(DotsComponent);
