import React, { useState } from "react";
import { useSelector } from "react-redux";

import styles from '../../styles/admin/admin.module.scss';

const CreateSchedule = () => {
  const { selectedDate } = useSelector(state => state.schedule);
  const { foreignList } = useSelector(state => state.user);
  const [time, setTime] = useState('');
  const [lang, setLang] = useState('');
  const [foreign, setForeign] = useState('');

  const onSelectTime = (e) => {
    setTime(e.target.value)
  }

  const onSelectLang = (lang) => {
    setLang(lang)
    setForeign('')
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
    return foreignList?.filter(v => v.position === lang);
  }
  
  return (
    <div className={styles.createSchedule}>
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
        <div className={styles.selectForeign}>
          <div className={styles.selectLang}>
            <button onClick={() => onSelectLang('en')} style={lang === 'en' ? {backgroundColor: '#182f9e', color: 'white'} : null}>영어</button>
            <button onClick={() => onSelectLang('ja')} style={lang === 'ja' ? {backgroundColor: '#5e87fe', color: 'white'} : null}>일본어</button>
            <button onClick={() => onSelectLang('ch')} style={lang === 'ch' ? {backgroundColor: '#fa6e7a', color: 'white'} : null}>중국어</button>
          </div>
          <div className={styles.foreignList}>
            {setForeignList() && setForeignList().map(v => (
                <button onClick={() => setForeign(v.id)} style={foreign === v.id ? {backgroundColor: '#e5e5e5'} : null}>{v.name}</button>
            ))}
          </div>
        </div>
        <button type="submit" onClick={onSubmit}>Save</button>
    </div>
  )
}

export default CreateSchedule;
