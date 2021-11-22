import React, { useCallback, memo } from 'react';
import moment from "moment";
import { useSelector } from "react-redux";
import axios from 'axios';
import Router from 'next/router';

import styles from '../../styles/reservation/Reservation.module.scss';
import { lang, toStringDate } from "../schedule/ScheduleItem";
import UserItem from "./UserItem";

const ShowSchedule = ({ schedule }) => {
    const { reservationUsers } = useSelector(state => state?.reservation);

    const onEnter = useCallback(async () => {
        try {
            const res = await axios.patch('/schedule/enter', schedule);
            console.log(res)
            Router.push('/video/' + res.data.id);
        } catch (err) {
            console.error(err);
            if (err.response?.status === 403) {
                alert(err?.response.data);
            }
        }
    }, []);

    return (
        <section className={styles.cardWrap}>
            <header>
                <h1>내 스케줄</h1>
                <p>
                    신청인원: <span className={styles.userLength}>{schedule.reservations.length}</span> / 4
                </p>
            </header>

            <div className={styles.infoDiv}>
                { lang(schedule.user.position) } { schedule.user.name } <br/>
                { toStringDate(schedule.date) }

                <div className={styles.circles}>
                    <span className={styles.greenCircle}/>
                    <span className={styles.pinkCircle}/>
                    <span className={styles.yellowCircle}/>
                </div>
            </div>

            <article>
                <label htmlFor="date">진행 날짜</label>
                <p id="date">{moment(schedule.date, "YYYYMMDD").format('YYYY년 MM월 DD일')}</p>
                <label htmlFor="time">진행 시간</label>
                <p id="time">
                    {moment(schedule.date, "YYYYMMDDhhmm").format('hh시 mm분')} ~ {
                    moment(schedule.date, 'YYYYMMDDhhmm').add(20, 'minutes').format('hh시 mm분')
                }
                </p>
                <label htmlFor="me">예약 학생</label>
                <div>
                    {reservationUsers?.map(v =>
                        <UserItem key={v.id} reservation={v} schedule={schedule}/>
                    )}
                </div>
                <div className={styles.buttonWrap}>
                    <button onClick={onEnter}>입장하기</button>
                </div>
            </article>
        </section>
    );
}

export default memo(ShowSchedule);
