import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { CREATE_SCHEDULE_REQUEST, DELETE_SCHEDULE_REQUEST } from '../../reducers/schedule';
import { closeModalAction } from '../../reducers/user';
import styles from '../../styles/admin/admin.module.scss';

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
      data: { id: newSchedule.id, user_id: foreignId, date: newSchedule.date }
    });
    dispatch(closeModalAction());
  }

  const onDelete = () => {
    if(newSchedule.id) {
      dispatch({
        type: DELETE_SCHEDULE_REQUEST,
        data: newSchedule.id
      });
    }
    dispatch(closeModalAction());
  }

  return (
    <div className={styles.userList}>
      <button onClick={onDelete}>-</button>
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
