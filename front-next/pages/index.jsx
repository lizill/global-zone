import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import { END } from 'redux-saga';
import { useSelector } from "react-redux";
import moment from 'moment';

import AppLayout from '../components/AppLayout';
import ReservationStatus from '../components/reservation/ReservationStatus';
import ReservationManagement from '../components/reservation/ReservationManagement';
import styles from '../styles/reservation/Reservation.module.scss';
import wrapper from '../store/configuresStore';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_RESERVATIONS_REQUEST } from '../reducers/reservation';

const subToday = moment().clone().subtract(20, 'minutes').format('YYYYMMDDHHmm')

export default function Home() {
  const { reservations } = useSelector(state => state?.reservation);

  const setItems = (confirmed) => {
    // 시간이 안지난 예약들만 표시 (예약한 시간 >= 현재 시간 - 20분)
    const items = reservations.filter(v => v.schedule.date >= subToday)
    
    if (confirmed) {
      return items.filter(v => v.confirmed === '1')
    } else {
      return items.filter(v => v.confirmed === '0')
    }
  }

  const getResults = () => {
    // 시간이 지났는데 confirmed === '1', finished === '0' 일 경우
    const items = reservations.filter(v => v.schedule.date <= subToday)
    return items.filter(v => v.confirmed === '1' && v.finished === '0')
  }

  return (
    <div>
      <Head>
        <title>글로벌존 | 예약 조회</title>
        <meta name="description" content="Global zone reservation service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout on="index">
        <div className={styles.reservationWrap}>
          <ReservationStatus setItems={setItems} getResults={getResults}/>
          <ReservationManagement setItems={setItems} getResults={getResults}/>
        </div>
      </AppLayout>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch({
    type: LOAD_RESERVATIONS_REQUEST,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});
