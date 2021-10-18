import React from "react";

const ScheduleItem = ({ schedule }) => {
  const lang = (position) => {
    switch(position) {
      case 'japanese':
        return '일본어'
      case 'chinese':
        return '중국어'
      case 'american':
        return '영어'
      default:
        return
    }
  }

  return (
    <div>
      <p>{ lang(schedule.user.position) } { schedule.user.name }</p>
    </div>
  )
}

export default ScheduleItem;
