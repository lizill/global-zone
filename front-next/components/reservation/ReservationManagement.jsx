import React, { useState, useCallback, memo } from "react";
import styles from '../../styles/reservation/Reservation.module.scss'
import { AiOutlineDownCircle } from 'react-icons/ai'

import Items from "./Items";

const standby = [
  {
    id: 1,
    lang: '일본어',
    name: '나카무라 시이아',
    date: '10월 13일 03:30 ~ 03:50'
  },
  {
    id: 2,
    lang: '일본어',
    name: '후쿠이 료우',
    date: '10월 13일 04:00 ~ 04:20'
  },
  {
    id: 3,
    lang: '일본어',
    name: '마키 코나츠',
    date: '10월 13일 04:30 ~ 04:50'
  },
]

const contentBtnList = [
  {
    name: "standby",
    src: "/images/reserv_list_status01.gif",
    p: "예약 대기"
  },
  {
    name: "completion",
    src: "/images/reserv_list_status02.gif",
    p: "예약 완료"
  },
  {
    name: "result",
    src: "/images/reserv_list_status03.gif",
    p: "결과 대기"
  },
]

const ContentBtn = ({ content, on, onList }) => {
  return (
    <button onClick={() => onList(content.name)}>
      <img src={content.src} alt="" />
      <p>{content.p}</p>
      <AiOutlineDownCircle
        className={styles.icon}
        style={
          on === content.name 
          ? { transform: "rotate(180deg)" } 
          : { transform: "rotate(0deg)" }
        }
      />
    </button>
  )
}

const ReservationManagement = () => {
  const [on, setOn] = useState('');

  const onList = useCallback((label) => {
    if(label === on) {
      setOn('');
    } else {
      setOn(label)
    }
  }, [on]);

  const transformHeight = useCallback((label, length) => {
    return on === label ? { height: 66 * length} : { height: 0 }
  }, [on]);

  return (
    <div className={styles.managementWrap}>
      <h3>예약 관리</h3>
      <div className={styles.contentWrap}>
        <ContentBtn content={contentBtnList[0]} on={on} onList={onList}/>
        <div className={styles.itemList} style={transformHeight("standby", standby.length)}>
          {standby.map(v => <Items key={v.id} content={v}/>)}
        </div>
        <ContentBtn content={contentBtnList[1]} on={on} onList={onList}/>
        <div className={styles.itemList} style={transformHeight("completion", standby.length)}>
          {standby.map(v => <Items key={v.id} content={v}/>)}
        </div>
        <ContentBtn content={contentBtnList[2]} on={on} onList={onList}/>
        <div className={styles.itemList} style={transformHeight("result", standby.length)}>
          {standby.map(v => <Items key={v.id} content={v}/>)}
        </div>
      </div>
    </div>
  )
}

export default memo(ReservationManagement);
