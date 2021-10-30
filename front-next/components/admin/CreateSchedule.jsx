import React, { useState } from "react";
import { useSelector } from "react-redux";

import styles from '../../styles/admin/admin.module.scss';

const CreateSchedule = () => {
  const { selectedDate } = useSelector(state => state.schedule);
  const { foreigns } = useSelector(state => state.user);
  const [time, setTime] = useState('');
  const [lang, setLang] = useState('');
  const [foreign, setForeign] = useState('');

  const onSelectTime = (e) => {
    setTime(e.target.value)
  }

  const onSelectLang = (e) => {
    setLang(e.target.value)
    setForeign('')
  }

  const onSelectForeign = (e) => {
    setForeign(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    
    let isConfirm = confirm(`
      신청 날짜: ${selectedDate}\n
      신청 시간: ${time}\n
      유학생: ${foreign}\n
      위 정보로 일정을 생성 하시겠습니까?
    `);
  }

  const setForeignList = () => {
    return foreigns?.filter(v => v.position === lang);
  }
  
  return (
    <div className={styles.createSchedule}>
      <form onSubmit={onSubmit}>
        <label htmlFor="start_date">신청 날짜</label>
        <input id="start_date" type="text" disabled value={selectedDate} /> <br />
        <label htmlFor="start_time">신청 시간</label>
        <select id="start_time" onChange={onSelectTime} value={time}>
          <option value="">신청 시간</option>
          <option value="10:00">10:00 ~ 10:20</option>
          <option value="10:30">10:30 ~ 10:50</option>
          <option value="11:00">11:00 ~ 11:20</option>
          <option value="11:30">11:30 ~ 11:50</option>
          <option value="12:00">12:00 ~ 12:20</option>
          <option value="12:30">12:30 ~ 12:50</option>
          <option value="13:00">13:00 ~ 13:20</option>
          <option value="13:30">13:30 ~ 13:50</option>
          <option value="14:00">14:00 ~ 14:20</option>
          <option value="14:30">14:30 ~ 14:50</option>
          <option value="15:00">15:00 ~ 15:20</option>
          <option value="15:30">15:30 ~ 15:50</option>
          <option value="16:00">16:00 ~ 16:20</option>
          <option value="16:30">16:30 ~ 16:50</option>
        </select><br/>
        <select id="lang" onChange={onSelectLang} value={lang}>
          <option value="">언어</option>
          <option value="en">영어</option>
          <option value="ja">일본어</option>
          <option value="ch">중국어</option>
        </select>
        <select id="foreign" onChange={onSelectForeign} value={foreign}>
          <option value="">유학생</option>
          {setForeignList() && setForeignList().map(v => (
            <option value={v.id}>{v.name}</option>
          ))}
        </select> <br/>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default CreateSchedule;
