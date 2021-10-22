import React from "react";
import { useSelector } from "react-redux";

import ScheduleItem from "../schedule/ScheduleItem";
import styles from '../../styles/admin/admin.module.scss'

const ScheduleList = () => {
  const { schedule } = useSelector(state => state.schedule);

  return (
    <div className={styles.scheduleList}>
      {
        schedule && schedule.map(v => (
          <ScheduleItem schedule={v}></ScheduleItem>
        ))
      }
    </div>
  )
}

export default ScheduleList;
