import React, { useState } from "react";

import CalendarContainer from "./CalendarConatainer";
import ScheduleList from "./ScheduleList";

const ScheduleContainer = () => {
  return (
    <div>
      <CalendarContainer/>
      <ScheduleList/>
    </div>
  )
}

export default ScheduleContainer;
