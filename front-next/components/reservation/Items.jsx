import React from "react";
import styles from '../../styles/reservation/Reservation.module.scss';

const Items = ({ content }) => {
  return (
    <div className={styles.itemWrap}>
      <p>[{content.lang}] {content.name}</p>
      <p>{content.date}</p>
    </div>
  )
}

export default Items;
