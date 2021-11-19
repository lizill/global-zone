import React, { memo } from "react";
import { useSelector } from "react-redux";
import styles from '../../styles/reservation/Reservation.module.scss';

const ReservationStatus = ({ setItems, getResults }) => {
  // const { reservations } = useSelector(state => state?.reservation);

  return (
    <div className={styles.statusWrap}>
      <h3>실시간 예약 현황</h3>
      <ul>
        <li>
          <p style={{color: "#ffdc40"}}>{ setItems(0).length }</p>
          예약 대기
        </li>
        <li>
          <p style={{color: "#ffdc40"}}>{ setItems(1).length }</p>
          예약 완료
        </li>
        <li>
          <p>{ getResults().length }</p>
          결과 대기
        </li>
      </ul>
    </div>
  )
}

export default memo(ReservationStatus);
