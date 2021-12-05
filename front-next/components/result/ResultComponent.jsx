import React, { useCallback, useState } from "react";
import moment from "moment";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useSelector } from "react-redux";

import styles from '../../styles/result/result.module.scss';

const ResultComponent = () => {
  const [getMoment, setMoment] = useState(moment);
  const { reservations } = useSelector(state => state?.reservation);

  const getPrevMonth = useCallback(() => {
    setMoment(getMoment.clone().subtract(1, 'month'))
  }, [getMoment]);

  const getNextMonth = useCallback(() => {
    setMoment(getMoment.clone().add(1, 'month')) 
  }, [getMoment]);

  const getCurrentReservations = useCallback(() => {
    return reservations.filter(v => v.schedule.date.slice(0, 6) === getMoment.format('YYYYMM'))
  }, [reservations, getMoment]);

  return (
    <div className={styles.resultWrap}>
      <header>
        <p>
          <span>{getMoment.format('YYYY')}</span>년 
          <span> {getMoment.format('MM')}</span>월
        </p>
        <div>
          <AiOutlineLeft className={styles.icon} onClick={getPrevMonth}/>
          <AiOutlineRight className={styles.icon} onClick={getNextMonth}/>
        </div>
      </header>
      <article>
        <div>
          <p>일시</p>
          <p>유학생</p>
        </div>
        {getCurrentReservations().length !== 0
        ? getCurrentReservations().map(v => v.finished == 1 && (
            <div key={v.id}>
              <p>{moment(v.schedule.date, "YYYYMMDDhhmm").format('MM-DD HH:mm')}</p>
              <p>{v.schedule.user.name}</p>
            </div>
          ))
        : (
          <div>
            <p>-</p>
            <p>진행 일정이 없습니다.</p>
          </div>
        )}
      </article>
    </div>
  )
}

export default ResultComponent;
