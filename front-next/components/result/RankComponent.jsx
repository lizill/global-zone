import React from "react";
import { useSelector } from 'react-redux';

import styles from '../../styles/result/result.module.scss'

const RankComponent = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <div className={styles.rankWrap}>
      <div className={styles.greenCircle}/>
      <div className={styles.pinkCircle}/>
      <div className={styles.yellowCircle}/>
      <div className={styles.status}>
        <span>{me && me.name}</span> 학생의 2021학년도 2학기<br/>
        글로벌 존 이용 횟수
      </div>
      <div className={styles.count}><span>3</span>회</div>
    </div>
  )
}

export default RankComponent;
