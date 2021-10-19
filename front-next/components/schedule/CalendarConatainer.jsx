import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { GrNext, GrPrevious } from 'react-icons/gr'

import styles from '../../styles/schedule/schedule.module.scss';
import { SET_SELETED_DATE } from "../../reducers/schedule";
import DotsComponent from "./DotsComponent";

const CalendarContainer = () => {
  const [getMoment, setMoment] = useState(moment);
  const { selectedDate } = useSelector(state => state.schedule);
  const dispatch = useDispatch();

  const today = getMoment; // today = moment()
  const firstWeek = today.clone().startOf('month').week();
  const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();

  const onSelectDate = (date) => {
    dispatch({
      type: SET_SELETED_DATE,
      data: date
    });
  }

  const calendarArr = () => {
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
                    <td className={styles.tableData} key={index}>
                      <button style={{ backgroundColor:'#E7E7FF', color: "#4F369C", fontWeight: "bold" }}
                        onClick={() => onSelectDate(days.format('YYYYMMDD'))}
                      >
                        {days.format('D')}
                      </button>
                        <DotsComponent/>
                    </td>
                );
              }else if(days.format('MM') !== today.format('MM')){
                return( // 그 외의 달
                    <td className={styles.tableData} key={index}>
                      <button style={{ color: '#C0C0C0' }}
                        onClick={() => onSelectDate(days.format('YYYYMMDD'))}
                      >
                        {days.format('D')}
                      </button>
                    </td>
                );
              }else{
                return(
                    <td className={styles.tableData} key={index}>
                      <button 
                        onClick={() => onSelectDate(days.format('YYYYMMDD'))}
                      >
                        {days.format('D')}
                      </button>
                    </td>
                );
              }
            })
          }
        </tr>
      );
    }
    return result;
  }

  const getPrevMonth = () => {
    setMoment(getMoment.clone().subtract(1, 'month'))
  }

  const getNextMonth = () => {
    setMoment(getMoment.clone().add(1, 'month')) 
  }
  
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

export default CalendarContainer;
