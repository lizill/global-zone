import React, { useState } from 'react';
import moment from "moment";
import { useSelector } from "react-redux";

import styles from '../../styles/reservation/Reservation.module.scss'

const ReservationCard = ({ schedule }) => {
    const { me } = useSelector(state => state?.user);
    const [check, setCheck] = useState(false);

    const onSubmit = () => {
        if(!check) {
            return alert('e-글로벌 존 예약 방침에 동의하셔야 신청 할 수 있습니다.')
        }
    }

    return (
        <section className={styles.cardWrap}>
            <header>
                <h1>예약신청</h1>
                <div>
                    <p>
                        <span>신청인원</span>
                        <span>{schedule.reservations.length} / 4</span>
                    </p>
                </div>
                <div>
                    [{schedule.user.position}] {schedule.user.name} <br/>
                    {schedule.date}
                </div>
            </header>

            <article>
                <label htmlFor="date">신청 날짜</label>
                <p id="date">{moment().format('MM월 DD일')}</p>
                <label htmlFor="time">신청 시간</label>
                <p id="time">{schedule.date}</p>
                <label htmlFor="foreign">유학생</label>
                <p id="foreign">{schedule.user.name}</p>
                <label htmlFor="me">신청 학생</label>
                <p id="me">{me.name}</p>
                <label htmlFor="me">e-글로벌 존 예약 방침</label>
                <p id="me">
                    [ 무단 예약 부도에 대한 동의 ] 예약 신청 후, 예약 취소 또는 관리자의 확인 없이 <br/>
                    예약 부도(일명 No Show)시, 관련 규정에 따라, 불이익이 주어짐에 동의합니다.
                </p>
                <input id="checkbox" type="checkbox" value={check} onClick={() => setCheck(!check)}/>
                <label htmlFor="checkbox">e - 글로벌 존 예약 방침에 동의합니다.</label>
                <button onClick={onSubmit}>신청하기</button>
            </article>
        </section>
    );
}

export default ReservationCard;