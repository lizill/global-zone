import React from "react";

import styles from '../../styles/admin/admin.module.scss'
import CalendarContainer from "../schedule/CalendarConatainer";
import ScheduleList from "./ScheduleList";

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
