import React, { useState } from "react";
import { useSelector } from "react-redux";

const CreateSchdule = () => {
  const { selectedDate } = useSelector(state => state.schedule);
  const [time, setTime] = useState('');

  const onChangeSelect = (e) => {
    setTime(e.target.value)
  }
  
  return (
    <div>
      <form>
        <label htmlFor="start_date">신청 날짜</label>
        <input id="start_date" type="text" disabled value={selectedDate} /> <br />
        <label htmlFor="start_time">신청 시간</label>
        <select id="start_time" onChange={onChangeSelect} value={time}>
          <option value="" >신청 시간</option>
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
        <label htmlFor="foreign">유학생</label>
        <input id="foreign" type="text" /> <br />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default CreateSchdule;
