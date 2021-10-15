import React from "react";
import CalendarContainer from "../schedule/CalendarConatainer";

import styles from '../../styles/admin/admin.module.scss'

const ScheduleControll = () => {
  return (
    <div>
      schedule controller
      <div className={styles.calendarWrap}>
        <CalendarContainer/>
      </div>
    </div>
  )
}

export default ScheduleControll;
