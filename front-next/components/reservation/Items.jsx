import React, { memo } from "react";
import {IoMdClose} from "react-icons/io";
import { IoEnterOutline } from 'react-icons/io5'
import { useDispatch } from "react-redux";

import styles from '../../styles/reservation/Reservation.module.scss';
import { lang, toStringDate } from '../schedule/ScheduleItem'
import {CANCEL_RESERVATION_REQUEST, LOAD_RESERVATIONS_REQUEST} from "../../reducers/reservation";

const Items = ({ reservation, standby, completion }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
        const response = confirm('예약을 취소하시겠습니까?');

        if(response) {
            try {
                dispatch({
                    type: CANCEL_RESERVATION_REQUEST,
                    data: reservation.id
                });
            } catch (err) {
                console.error(err);
            }
        }
    }

    const onEnter = () => {
        alert('10분 전부터 입장할 수 있습니다.')
    }

    return (
        <div className={styles.itemWrap}>
            <p>
                { lang(reservation.schedule.user.position) } { reservation.schedule.user.name } <br/>
                { toStringDate(reservation.schedule.date) }
            </p>
            {standby && <IoMdClose className={styles.deleteBtn} onClick={onDelete}/>}
            {completion && <IoEnterOutline className={styles.enterBtn} onClick={onEnter}/> }
        </div>
    )
}

export default memo(Items);
