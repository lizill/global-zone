import React, { useState, useCallback, memo } from "react";
import styles from '../../styles/reservation/Reservation.module.scss'

import Items from "./Items";
import ContentBtn from "./ContentBtn";

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

const ReservationManagement = ({ setItems, getResults }) => {
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
        <div className={styles.itemList} style={transformHeight("standby", setItems(0)?.length)}>
          {setItems(0)?.map(v => <Items key={v.id} reservation={v} standby/>)}
        </div>
        <ContentBtn content={contentBtnList[1]} on={on} onList={onList}/>
        <div className={styles.itemList} style={transformHeight("completion", setItems(1)?.length)}>
          {setItems(1)?.map(v => <Items key={v.id} reservation={v} completion/>)}
        </div>
        <ContentBtn content={contentBtnList[2]} on={on} onList={onList}/>
        <div className={styles.itemList} style={transformHeight("result", getResults()?.length)}>
          {getResults().map(v => <Items key={v.id} reservation={v}/>)}
        </div>
      </div>
    </div>
  )
}

export default memo(ReservationManagement);
