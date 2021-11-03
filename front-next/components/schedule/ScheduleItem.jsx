import React, { useCallback, memo } from "react";
import moment from "moment";
import { BsFillPersonFill } from 'react-icons/bs';
import Link from 'next/link';

import styles from '../../styles/schedule/schedule.module.scss';

export const lang = (position) => {
  switch(position) {
    case 'ja':
      return '[일본어]'
    case 'ch':
      return '[중국어]'
    case 'en':
      return '[영어]'
    default:
      return
  }
};

export const toStringDate = (date) => {
  return (`
    ${moment(date, "YYYYMMDD").format('MM월 DD일 ')}
    ${moment(date, "YYYYMMDDhhmm").format('hh시 mm분')} ~ ${
      moment(date, 'YYYYMMDDhhmm').add(20, 'minutes').format('hh시 mm분')
    }
  `);
}

const ScheduleItem = ({ schedule }) => {

  const setBackgroundColor = useCallback((position) => {
    switch(position) {
      case 'ja':
        return [{ backgroundColor: "#659cff" }, { backgroundColor: "#5e87fe" }]
      case 'ch':
        return [{ backgroundColor: "#ff808b" }, { backgroundColor: "#fa6e7a" }]
      case 'en':
        return [{ backgroundColor: "#4d4cac" }, { backgroundColor: "#4241a4" }]
      default:
        return
    }
  }, []);

  return (
    <Link href={`/schedule/${schedule.id}`}>
      <div className={styles.scheduleItemWrap} style={setBackgroundColor(schedule.user.position)[0]}>
        <p> {/* 11월 02일 11시 00분 ~ 11시 20분 */}
          { lang(schedule.user.position) } { schedule.user.name } <br/>
          { toStringDate(schedule.date) }
        </p>
        <div className={styles.reservationsDiv} style={setBackgroundColor(schedule.user.position)[1]}>
          {schedule.reservations.length < 4
            ? <span>예약 가능</span>
            : <span>예약 불가능</span>}
          <span>
            <BsFillPersonFill style={{ marginRight: "8px", fontSize: '1.3em' }}/>
            { schedule.reservations.length } / 4
          </span>
        </div>
      </div>
    </Link>
  );
}

export default memo(ScheduleItem);
