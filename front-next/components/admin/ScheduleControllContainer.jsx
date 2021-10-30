import React from "react";

import ScheduleList from "./ScheduleList";
import CreateSchedule from "./CreateSchedule";
import styles from '../../styles/admin/admin.module.scss'
import CalendarContainer from "../schedule/CalendarConatainer";

const ScheduleControllerContainer = () => {
  return (
    <div className={styles.scContainer}>
      <div>
        <CalendarContainer/>
        <CreateSchedule className={styles.createSchedule}/>
      </div>
        <div className={styles.scheduleList}>
            <ScheduleList/>
        </div>
    </div>
  )
}

export default ScheduleControllerContainer;
