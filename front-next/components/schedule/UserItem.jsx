import React from 'react';
import { useDispatch } from "react-redux";

import styles from '../../styles/schedule/schedule.module.scss';
import { ACCEPT_RESERVATION_REQUEST } from "../../reducers/reservation";

const UserItem = ({ reservation }) => {
    const dispatch = useDispatch();

    const onAccept = () => {
        const response = confirm('예약신청을 수락하시겠습니까?');

        if(response) {
            try {
                dispatch({
                    type: ACCEPT_RESERVATION_REQUEST,
                    data: reservation
                });
            } catch(err) {
                console.error(err);
            }
        }
    }

    return (
        <div className={styles.userItem}>
            <span>{reservation.user.name}</span>
            {reservation.confirmed ==='0' && <button onClick={onAccept}>수락</button>}
        </div>
    )
}

export default UserItem;
