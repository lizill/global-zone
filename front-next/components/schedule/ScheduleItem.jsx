import React from "react";
import moment from "moment";
import { BsFillPersonFill } from 'react-icons/bs';

import styles from '../../styles/schedule/schedule.module.scss';

const ScheduleItem = ({ schedule }) => {
  const lang = (position) => {
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
  }

  return (
    <div className={styles.itemWrap}>
      <p>
        { lang(schedule.user.position) } { schedule.user.name } <br/>
        { moment(schedule.date, "YYYYMMDDhhmm").format('MM월 DD일 ') }
        { moment(schedule.date, "YYYYMMDDhhmm").format('hh시 mm분') } ~ { moment(schedule.date, 'YYYYMMDDhhmm').add(20, 'minutes').format('hh시 mm분') }
      </p>
      <div className={styles.reservationsDiv}>
        <span>예약 가능</span>
        <span>
          <BsFillPersonFill style={{ marginRight: "8px", fontSize: '1.3em' }}/>
          { schedule.reservations.length } / 4
        </span>
      </div>
    </div>
  );
}

export default ScheduleItem;
