import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsCheckLg } from 'react-icons/bs'

import { CHECK_RESERVATION_REQUEST } from '../../reducers/reservation'
import styles from '../../styles/video/video.module.scss'

const AttendanceCheck = ({ reservations }) => {
  const { checkReservationLoading } = useSelector(state => state?.reservation)
  const dispatch = useDispatch()

  const onCheck = (reservation) => {
    dispatch({
      type: CHECK_RESERVATION_REQUEST,
      data: reservation
    })
  }

  return (
    <div className={styles.checkWrap}>
      <h2><span>출석</span>했는지 체크해주세요</h2>
      {reservations.map(v =>
        <button 
          key={v.user.id} 
          onClick={() => onCheck(v)} 
          disabled={checkReservationLoading}
        >
          <p>{ v.user.name + ` (${v.user.email})` }</p>
          {v.finished == 1 && <BsCheckLg style={{color: '#182f9e'}}/>}
        </button>
        )}
    </div>
  )
}

export default AttendanceCheck;
