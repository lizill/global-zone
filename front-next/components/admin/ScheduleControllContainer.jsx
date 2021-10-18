import React from "react";
import ScheduleList from "./ScheduleList";

import CreateSchdule from "./CreateSchedule";
import ScheduleControll from "./ScheduleControll";

const ScheduleControllContainer = () => {
  return (
    <div>
      <ScheduleControll/>
      <CreateSchdule/>
      <ScheduleList/>
    </div>
  )
}

export default ScheduleControllContainer;
