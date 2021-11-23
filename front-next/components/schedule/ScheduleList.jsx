import React, { useState, useCallback, memo } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import ScheduleItem from "./ScheduleItem";
import styles from '../../styles/schedule/schedule.module.scss';

const ScheduleList = () => {
  const { selectedDate, schedules } = useSelector(state => state?.schedule);
  const { me } = useSelector(state => state?.user);
  const [menu, setMenu] = useState('전체');

  const onClickMenu = useCallback((value) => {
    setMenu(value);
  }, [menu]);

  const setList = useCallback((value) => {
    const listByDate = schedules.filter(v => moment(v.date, 'YYYYMMDDhhmm').format('YYYYMMDD') === selectedDate);
    switch (value) {
      case '전체':
        return listByDate
      case '영어':
        return listByDate.filter(v => v.user.position === 'en');
      case '일본어':
        return listByDate.filter(v => v.user.position === 'ja');
      case '중국어':
        return listByDate.filter(v => v.user.position === 'ch');
    }
  }, [schedules, selectedDate]);

  return (
    <div className={styles.scheduleListWrap}>
      {/* 일주일치 데이터를 가져와서 미리 저장 */}
      <div className={styles.content}>
        {me?.position === 'korean' &&
          <menu>
            <button
              className={menu === '전체' ? styles.on : null}
              onClick={() => onClickMenu('전체')}
            >
              <p>전체</p>
            </button>
            <button
              className={menu === '영어' ? styles.on : null}
              onClick={() => onClickMenu('영어')}
            >
              영어
              <div style={{ backgroundColor: "#4d4cac" }}/>
            </button>
            <button 
              className={menu === '일본어' ? styles.on : null} 
              onClick={() => onClickMenu('일본어')}
            >
              일본어
              <div style={{ backgroundColor: "#659cff" }}/>
            </button>
            <button
              className={menu === '중국어' ? styles.on : null} 
              onClick={() => onClickMenu('중국어')}
            >
              중국어
              <div style={{ backgroundColor: "#ff6565" }}/>
            </button>
          </menu>
        }
        <div className={styles.listWrap}>
          {
            setList(menu).length !== 0
            ? setList(menu).map(v => (<ScheduleItem key={v.id} schedule={v}/>))
            : <div className={styles.empty}>데이터가 없습니다.</div>
          }
        </div>
      </div>
    </div>
  )
}

export default memo(ScheduleList);
