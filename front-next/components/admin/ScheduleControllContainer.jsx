import React from "react";
import ScheduleList from "./ScheduleList";

import CreateSchdule from "./CreateSchedule";
import ScheduleControll from "./ScheduleControll";
import styles from '../../styles/admin/admin.module.scss'

const ScheduleControllContainer = () => {
  return (
    <div className={styles.scConatiner}>
      <div>
        <ScheduleControll className={styles.scheduleControll}/>
        <CreateSchdule className={styles.createSchdule}/>
      </div>
      <ScheduleList className={styles.scheduleList}/>
    </div>
  )
}

export default ScheduleControllContainer;
