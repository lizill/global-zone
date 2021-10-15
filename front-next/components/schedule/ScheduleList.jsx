import React from "react";
import { useSelector } from "react-redux";

const ScheduleList = () => {
  const { selectedDate } = useSelector(state => state.schedule)

  return (
    <div>
      <p>{ selectedDate }</p>
    </div>
  )
}

export default ScheduleList;
