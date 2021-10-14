import React from "react";
import styles from '../../styles/reservation/Reservation.module.scss';

const ReservationStatus = () => {
  return (
    <div className={styles.statusWrap}>
      <h3>실시간 예약 현황</h3>
      <ul>
        <li>
          <p style={{color: "#ffdc40"}}>0</p>
          예약 대기
        </li>
        <li>
          <p>0</p>
          예약 완료
        </li>
        <li>
          <p>0</p>
          결과 대기
        </li>
      </ul>
    </div>
  )
}

export default ReservationStatus;
