import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";

import styles from '../../styles/admin/admin.module.scss';
import { CREATE_SCHEDULE_REQUEST } from "../../reducers/schedule";

const CreateSchedule = () => {
  const dispatch = useDispatch();
  const { selectedDate } = useSelector(state => state?.schedule);
  const { foreignList } = useSelector(state => state?.user);
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

  const onSubmit = async () => {
    if (time === '') {
      return alert('시간을 선택해 주세요')
    }
    if (foreign === '') {
      return alert('유학생을 선택해 주세요')
    }

    let isConfirm = confirm(`
      신청 날짜: ${ moment(selectedDate, "YYYYMMDD").format('YYYY년 MM월 DD일') }
      신청 시간: ${ moment(time, "hh:mm").format('hh시 mm분') }
      유학생: ${ foreignList.find(({ id }) => id === foreign).name }\n
      위 정보로 일정을 생성 하시겠습니까?
    `);

    if (isConfirm) {
      try {
        dispatch({
          type: CREATE_SCHEDULE_REQUEST,
          data: { user_id: foreign, date: selectedDate + moment(time, "HH:mm").format('HHmm') }
        });

        alert('생성되었습니다.');
        setTime('');
        setForeign('');
        setLang('');
      } catch (err) {
        console.error(err);
      }
    }
  }

  const setForeignList = () => {
    return foreignList?.filter(v => v.position === lang);
  }

  const setColor = (on) => {
    switch (on) {
      case 'en':
        return {backgroundColor: '#182f9e', color: 'white'}
      case 'ja':
        return {backgroundColor: '#5e87fe', color: 'white'}
      case 'ch':
        return {backgroundColor: '#fa6e7a', color: 'white'}
    }
  }
  
  return (
    <div className={styles.createSchedule}>
      <label htmlFor="start_date">신청 날짜: </label>
      <span id="start_data">
        { moment(selectedDate, "YYYYMMDD").format('YYYY년 MM월 DD일') }
      </span> <br/>
      <label htmlFor="start_time">신청 시간: </label>
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
        <div>
          <button onClick={() => onSelectLang('en')} style={lang === 'en' ? setColor('en') : null}>
            영어
          </button>
          <button onClick={() => onSelectLang('ja')} style={lang === 'ja' ? setColor('ja') : null}>
            일본어
          </button>
          <button onClick={() => onSelectLang('ch')} style={lang === 'ch' ? setColor('ch') : null}>
            중국어
          </button>
        </div>
        <div>
          {setForeignList() && setForeignList().map(v => (
              <button
                key={v.id}
                onClick={() => setForeign(v.id)}
                style={foreign === v.id ? {backgroundColor: '#e5e5e5'} : null}
              >
                { v.name }
              </button>
          ))}
        </div>
      </div>
      <div className={styles.submitBtnWrap}>
        <button type="submit" onClick={onSubmit}>Save</button>
      </div>
    </div>
  )
}

export default CreateSchedule;
