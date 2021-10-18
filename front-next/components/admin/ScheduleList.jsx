import React from "react";

import ScheduleItem from "../schedule/ScheduleItem";

const schedule = [
  {
    start_date: '20211101',
    user: {
      name: '나카무라 시이아',
      position: 'japanese'
    }
  }
]

const ScheduleList = () => {
  return (
    <div>
      <ScheduleItem schedule={schedule[0]}></ScheduleItem>
    </div>
  )
}

export default ScheduleList;
