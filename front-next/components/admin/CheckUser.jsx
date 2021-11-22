import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { CREATE_SCHEDULE_REQUEST } from '../../reducers/schedule';
import { closeModalAction } from '../../reducers/user';

const CheckUser = () => {
  const dispatch = useDispatch();
  const { foreignList } = useSelector(state => state?.user);
  const { newSchedule } = useSelector(state => state?.schedule);

  const setForeignList = () => {
    return foreignList?.filter(v => v.position === newSchedule?.lang)
  };

  const onSubmit = (foreignId) => {
    dispatch({
      type: CREATE_SCHEDULE_REQUEST,
      data: { user_id: foreignId, date: newSchedule.date }
    });
    dispatch(closeModalAction());
  }

  return (
    <div>
      {setForeignList()?.map(v => (
          <button
            key={v.id}
            onClick={() => onSubmit(v.id)}
          >
            { v.name }
          </button>
      ))}
    </div>
  )
}

export default CheckUser
