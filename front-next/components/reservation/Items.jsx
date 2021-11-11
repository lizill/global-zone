import React, { memo, useEffect, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import { IoEnterOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import axios from "axios";

import styles from '../../styles/reservation/Reservation.module.scss';
import { lang, toStringDate } from '../schedule/ScheduleItem'
import { CANCEL_RESERVATION_REQUEST } from "../../reducers/reservation";

const Items = ({ reservation, standby, completion }) => {
    const dispatch = useDispatch();
    const { enterScheduleError, enterScheduleDone } = useSelector(state => state?.schedule);

    const onDelete = useCallback(() => {
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
    }, []);

    const onEnter = useCallback(async () => {
        try {
            const res = await axios.patch('/schedule/enter', reservation.schedule);

            Router.push('/video/' + res.data.id);
        } catch (err) {
            console.error(err);
            if (err.response?.status === 403) {
                alert(err.response.data);
            }
        }
    }, []);

    useEffect(() => {
        if(enterScheduleError) {
            alert(enterScheduleError);
            console.log(enterScheduleError);
        }
        if(enterScheduleDone) {
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
