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
          <option value="AM 10시 00분 ~ AM 10시 20분">10:00 ~ 10:20</option>
          <option value="AM 10시 30분 ~ AM 10시 50분">10:30 ~ 10:50</option>
          <option value="AM 11시 00분 ~ AM 11시 20분">11:00 ~ 11:20</option>
          <option value="AM 11시 30분 ~ AM 11시 50분">11:20 ~ 11:50</option>
        </select><br/>
        <label htmlFor="foreign">유학생</label>
        <input id="foreign" type="text" /> <br />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default CreateSchdule;
