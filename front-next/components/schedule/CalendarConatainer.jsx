import React, { useState, useCallback, memo } from "react";
import { useSelector } from "react-redux";
import moment from 'moment';
import { GrNext, GrPrevious } from 'react-icons/gr';

import styles from '../../styles/schedule/schedule.module.scss';
import TdComponent from "./TdComponent";

const CalendarContainer = () => {
  const [getMoment, setMoment] = useState(moment);
  const { selectedDate } = useSelector(state => state.schedule);

  const today = getMoment; // today = moment()
  const firstWeek = today.clone().startOf('month').week();
  const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();

  const calendarArr = useCallback(() => {
    let result = [];
    let week = firstWeek;
    for ( week; week <= lastWeek; week++) {
      result = result.concat(
        <tr className={styles.tableRow} key={week}>
          {
            Array(7).fill(0).map((data, index) => {
              let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');
              if(selectedDate === days.format('YYYYMMDD')){
                return( // 선택된 날짜
                  <TdComponent
                    key={index}
                    index={index} days={days}
                    styleProps={{ backgroundColor:'#E7E7FF', color: "#4F369C", fontWeight: "bold" }}
                  />
                );
              }else if(days.format('MM') !== today.format('MM')){ // 다른 달
                return <TdComponent key={index} index={index} styleProps={{ color: '#C0C0C0' }} days={days}/>
              }else{
                return <TdComponent key={index} index={index} days={days}/>
              }
            })
          }
        </tr>
      );
    }
    return result;
  }, [getMoment, selectedDate]);

  const getPrevMonth = useCallback(() => {
    setMoment(getMoment.clone().subtract(1, 'month'))
  }, [getMoment]);

  const getNextMonth = useCallback(() => {
    setMoment(getMoment.clone().add(1, 'month')) 
  }, [getMoment]);
  
  return (
    <div className={styles.calendarWrap}>
      <div className={styles.calendarHeader}>
        <p>
          <span>{today.format('YYYY')}</span>년 
          <span> {today.format('MM')}</span>월
        </p>
        <div>
          <button onClick={getPrevMonth}><GrPrevious/></button>
          <button onClick={getNextMonth}><GrNext/></button>
        </div>
      </div>
      <table className={styles.calendarTable}>
        <tbody>
          <tr className={styles.tableHeader}>
            <th style={{ color: 'red' }}>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
          </tr>
          { calendarArr() }
        </tbody>
      </table>
    </div>
  );
}

export default memo(CalendarContainer);
