import React, { useState, useCallback, memo } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import Modal from '../Modal';
import CheckUser from './CheckUser';
import ScheduleItem from "../schedule/ScheduleItem";
import styles from '../../styles/admin/admin.module.scss';
import TdBtn from "./TdBtn";

const DATA = [
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
]

const ScheduleList = () => {
  const { selectedDate, schedules } = useSelector(state => state?.schedule)

  const setSchedulesByDate = useCallback(() => {
    return schedules?.filter(v => v.date.slice(0, 8) === selectedDate)
  }, [selectedDate, schedules]);

  const setTd = useCallback((time, lang) => {
    const filtTime = setSchedulesByDate().filter(v => moment(v.date, "YYYYMMDDHHmm").format('HH:mm') === time)
    const filtLang = filtTime.filter(v => v.user.position === lang)

    if (filtLang.length) {
      return filtLang[0]
    } else {
      return null // 값이 없음
    }
  }, [selectedDate, schedules]);

  return (
      <div className={styles.scheduleListWrap}>
        <table>
          <thead>
            <th>시간</th>
            <th>영어</th>
            <th>일본어</th>
            <th>중국어</th>
          </thead>
          <tbody>
            {DATA?.map(v => (
              <tr key={v}>
                <td>{v}</td>
                <td><TdBtn schedule={setTd(v, 'en')} date={v} lang={'en'}/></td>
                <td><TdBtn schedule={setTd(v, 'ja')} date={v} lang={'ja'}/></td>
                <td><TdBtn schedule={setTd(v, 'ch')} date={v} lang={'ch'}/></td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal>
          <CheckUser/>
        </Modal>
      </div>
  )
}

export default memo(ScheduleList);
