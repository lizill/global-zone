import React from "react";

import ScheduleItem from "../schedule/ScheduleItem";

const schedule = [
  {
    id: 1,
    date: '202111011000', // 'YYYYMMDDhhmm'
    user: {
      id: 2,
      name: '나카무라 시이아',
      position: 'japanese'
    },
    reservations: [
      {
        id: 1,
        email: 'lizill@g.yju.ac.kr',
        name: '박동현'
      }
    ]
  },
  {
    id: 2,
    date: '202111021100', // 'YYYYMMDDhhmm'
    user: {
      id: 2,
      name: '나카무라 시이아',
      position: 'japanese'
    },
    reservations: [
      {
        id: 1,
        email: 'lizill@g.yju.ac.kr',
        name: '박동현'
      }
    ]
  },
  {
    id: 3,
    date: '202111011000', // 'YYYYMMDDhhmm'
    user: {
      id: 2,
      name: '나카무라 시이아',
      position: 'japanese'
    },
    reservations: [
      {
        id: 1,
        email: 'lizill@g.yju.ac.kr',
        name: '박동현'
      }
    ]
  },
  {
    id: 4,
    date: '202111011000', // 'YYYYMMDDhhmm'
    user: {
      id: 2,
      name: '나카무라 시이아',
      position: 'japanese'
    },
    reservations: [
      {
        id: 1,
        email: 'lizill@g.yju.ac.kr',
        name: '박동현'
      }
    ]
  },
]

const ScheduleList = () => {
  return (
    <div>
      {
        schedule && schedule.map(v => (
          <ScheduleItem schedule={v}></ScheduleItem>
        ))
      }
    </div>
  )
}

export default ScheduleList;
