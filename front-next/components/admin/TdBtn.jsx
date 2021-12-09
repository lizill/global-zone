import React, { useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { openModalAction } from '../../reducers/user';
import { selectScheduleAction } from '../../reducers/schedule';
import styles from '../../styles/admin/admin.module.scss';

const TdBtn = ({ schedule, date, lang, bgColor }) => {
  const dispatch = useDispatch()
  const { selectedDate } = useSelector(state => state?.schedule)

  const onSelectSchedule = useCallback(() => {
    dispatch(selectScheduleAction({ id: schedule?.id, date: selectedDate + moment(date, 'HH:mm').format('HHmm'), lang }));
    dispatch(openModalAction());
  }, [selectedDate, schedule]);

  return (
    <div className={styles.scheduleBtnWrap}>
      <button onClick={() => onSelectSchedule()} style={schedule ? bgColor : { backgroundColor: '#dbdbdb' }}>
        {schedule ? schedule.user.name : ''}
      </button>
    </div>
  )
}

export default memo(TdBtn);
