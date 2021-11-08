import React, { useState, useEffect } from 'react';
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import styles from '../../styles/reservation/Reservation.module.scss';
import { lang, toStringDate } from "../schedule/ScheduleItem";
import {RESERVATION_REQUEST} from "../../reducers/reservation";
import Router from "next/router";

const ReservationCard = ({ schedule }) => {
    const dispatch = useDispatch();
    const { me } = useSelector(state => state?.user);
    const { reservationDone, reservationError } = useSelector(state => state?.reservation);
    const [check, setCheck] = useState(false);

    const onSubmit = () => {
        if(!check) {
            return alert('e-글로벌 존 예약 방침에 동의하셔야 신청 할 수 있습니다.')
        }

        try {
            dispatch({
                type: RESERVATION_REQUEST,
                data: { scheduleId: schedule.id, scheduleDate: schedule.date }
            });
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (reservationError) {
            console.log(reservationError)
            alert(reservationError);
        }
        if(reservationDone) {
            alert('예약이 완료되었습니다.');
            Router.push('/');
        }
    }, [reservationError, reservationDone]);

    return (
        <section className={styles.cardWrap}>
            <header>
                <h1>예약신청</h1>
                <p>
                    신청인원: <span className={styles.userLength}>{schedule.reservations?.length}</span> / 4
                </p>
            </header>

            <div className={styles.infoDiv}>
                { lang(schedule.user?.position) } { schedule.user?.name } <br/>
                { toStringDate(schedule.date) }

                <div className={styles.circles}>
                    <span className={styles.greenCircle}/>
                    <span className={styles.pinkCircle}/>
                    <span className={styles.yellowCircle}/>
                </div>
            </div>

            <article>
                <label htmlFor="date">신청 날짜</label>
                <p id="date">{moment(schedule.date, "YYYYMMDD").format('YYYY년 MM월 DD일')}</p>
                <label htmlFor="time">신청 시간</label>
                <p id="time">
                    {moment(schedule.date, "YYYYMMDDhhmm").format('hh시 mm분')} ~ {
                      moment(schedule.date, 'YYYYMMDDhhmm').add(20, 'minutes').format('hh시 mm분')
                    }
                </p>
                <label htmlFor="foreign">유학생</label>
                <p id="foreign">{schedule.user?.name}</p>
                <label htmlFor="me">신청 학생</label>
                <p id="me">{me?.name}</p>
                <label htmlFor="term">e-글로벌 존 예약 방침</label>
                <p id="term" className={styles.term}>
                    [ 무단 예약 부도에 대한 동의 ] 예약 신청 후, 예약 취소 또는 관리자의 확인 없이 <br/>
                    예약 부도(일명 No Show)시, 관련 규정에 따라, 불이익이 주어짐에 동의합니다.
                </p>
                <div className={styles.termWrap}>
                    <input id="checkbox" type="checkbox" value={check} onClick={() => setCheck(!check)}/>
                    <label htmlFor="checkbox">e - 글로벌 존 예약 방침에 동의합니다.</label>
                </div>
                <div className={styles.buttonWrap}>
                    <button onClick={onSubmit}>신청하기</button>
                </div>
            </article>
        </section>
    );
}

export default ReservationCard;