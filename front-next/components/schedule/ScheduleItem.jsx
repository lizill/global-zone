import React, { useCallback, memo } from "react";
import moment from "moment";
import { BsFillPersonFill } from 'react-icons/bs';

import styles from '../../styles/schedule/schedule.module.scss';

const ScheduleItem = ({ schedule }) => {
  const lang = useCallback((position) => {
    switch(position) {
      case 'japanese':
        return '[일본어]'
      case 'chinese':
        return '[중국어]'
      case 'american':
        return '[영어]'
      default:
        return
    }
  }, []);

  const setBackgroundColor = useCallback((position) => {
    switch(position) {
      case 'japanese':
        return [{ backgroundColor: "#659cff" }, { backgroundColor: "#5e87fe" }]
      case 'chinese':
        return [{ backgroundColor: "#ff808b" }, { backgroundColor: "#fa6e7a" }]
      case 'american':
        return [{ backgroundColor: "#182f9e" }, { backgroundColor: "#182f9e" }]
      default:
        return
    }
  }, []);

  return (
    <div className={styles.scheduleItemWrap} style={setBackgroundColor(schedule.user.position)[0]}>
      <p> {/* 11월 02일 11시 00분 ~ 11시 20분 */}
        { lang(schedule.user.position) } { schedule.user.name } <br/>
        { moment(schedule.date, "YYYYMMDDhhmm").format('MM월 DD일 ') }
        {
          moment(schedule.date, "YYYYMMDDhhmm").format('hh시 mm분')
        } ~ {
          moment(schedule.date, 'YYYYMMDDhhmm').add(20, 'minutes').format('hh시 mm분')
        }
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
  );
}

export default memo(ScheduleItem);
