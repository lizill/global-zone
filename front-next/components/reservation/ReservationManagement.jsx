import React, { useState, useCallback, memo } from "react";
import { useSelector } from 'react-redux';
import styles from '../../styles/reservation/Reservation.module.scss'
import { AiOutlineDownCircle } from 'react-icons/ai'

import Items from "./Items";

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
  const { reservations } = useSelector(state => state?.reservation);
  const { me } = useSelector(state => state?.user);
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

  const setItems = (confirmed) => {
    if (confirmed) {
      return reservations.filter(v => v.confirmed === '1')
    } else {
      return reservations.filter(v => v.confirmed === '0')
    }
  }

  return (
    <div className={styles.managementWrap}>
      <h3>예약 관리</h3>
      <div className={styles.contentWrap}>
        <ContentBtn content={contentBtnList[0]} on={on} onList={onList}/>
        <div className={styles.itemList} style={transformHeight("standby", setItems(0)?.length)}>
          {setItems(0)?.map(v => <Items key={v.id} reservation={v} standby/>)}
        </div>
        <ContentBtn content={contentBtnList[1]} on={on} onList={onList}/>
        <div className={styles.itemList} style={transformHeight("completion", setItems(1)?.length)}>
          {setItems(1)?.map(v => <Items key={v.id} reservation={v} completion/>)}
        </div>
        <ContentBtn content={contentBtnList[2]} on={on} onList={onList}/>
        <div className={styles.itemList} style={transformHeight("result", 0)}>
          {/*{reservations.map(v => <Items key={v.id} reservation={v}/>)}*/}
        </div>
      </div>
    </div>
  )
}

export default memo(ReservationManagement);
