import React, { memo, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { IoEnterOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";

import styles from '../../styles/reservation/Reservation.module.scss';
import { lang, toStringDate } from '../schedule/ScheduleItem'
import { CANCEL_RESERVATION_REQUEST } from "../../reducers/reservation";
import { ENTER_SCHEDULE_REQUEST } from "../../reducers/schedule";

const Items = ({ reservation, standby, completion }) => {
    const dispatch = useDispatch();
    const { enterScheduleError, enterScheduleDone } = useSelector(state => state?.schedule);

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
        try {
            dispatch({
                type: ENTER_SCHEDULE_REQUEST,
                data: reservation.schedule
            });
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if(enterScheduleError) {
            alert(enterScheduleError);
            console.log(enterScheduleError);
        }
        if(enterScheduleDone) {
            Router.push('/video/' + reservation.schedule.id);
        }
    }, [enterScheduleError, enterScheduleDone]);

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
