import React, { useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { openModalAction } from '../../reducers/user';
import { selectScheduleAction } from '../../reducers/schedule';
import moment from 'moment';

const TdBtn = ({ schedule, date, lang }) => {
  const dispatch = useDispatch()
  const { selectedDate } = useSelector(state => state?.schedule)

  const onSelectSchedule = useCallback(() => {
    dispatch(selectScheduleAction({ date: selectedDate + moment(date, 'HH:mm').format('HHmm'), lang }));
    dispatch(openModalAction());
  }, [selectedDate]);

  return (
    <div>
      <button onClick={() => onSelectSchedule()}>
        {schedule ? schedule.user.name : '-'}
      </button>
    </div>
  )
}

export default memo(TdBtn);
