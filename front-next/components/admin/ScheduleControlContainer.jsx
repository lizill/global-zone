import React from "react";

import ScheduleList from "../schedule/ScheduleList";
import styles from '../../styles/admin/admin.module.scss'
import CalendarContainer from "../schedule/CalendarConatainer";

const ScheduleControllerContainer = () => {
  return (
    <div className={styles.scContainer}>
        <div className={styles.calendarWrap}>
            <CalendarContainer/>
        </div>
        <div className={styles.scheduleList}>
            <ScheduleList/>
        </div>
    </div>
  )
}

export default ScheduleControllerContainer;
