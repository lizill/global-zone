import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";

import { SET_SELECTED_DATE } from "../../reducers/schedule";
import styles from '../../styles/schedule/schedule.module.scss';
import DotsComponent from "./DotsComponent";

const TdComponent = ({ index, styleProps, days }) => {
  const dispatch = useDispatch();
  const { schedules } = useSelector(state => state?.schedule)

  const onSelectDate = useCallback((date) => {
    dispatch({
      type: SET_SELECTED_DATE,
      data: date
    });
  }, []);

  return (
    <td className={styles.tableData} key={index}>
      <button style={styleProps}
        onClick={() => onSelectDate(days.format('YYYYMMDD'))}
      >
        <span>{ days.format('D') }</span>
        <DotsComponent list={
          schedules.filter(v => moment(v.date, 'YYYYMMDD').format('YYYYMMDD') === days.format('YYYYMMDD'))
        }/>
      </button>
    </td>
  )
}

export default memo(TdComponent);
