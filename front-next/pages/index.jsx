import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import { END } from 'redux-saga';
import { useSelector } from "react-redux";

import AppLayout from '../components/AppLayout';
import ReservationStatus from '../components/reservation/ReservationStatus';
import ReservationManagement from '../components/reservation/ReservationManagement';
import styles from '../styles/reservation/Reservation.module.scss';
import wrapper from '../store/configuresStore';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_RESERVATIONS_REQUEST } from '../reducers/reservation';

export default function Home() {
  const { me } = useSelector(state => state?.user);
  return (
    <div>
      <Head>
        <title>글로벌존 | 예약 조회</title>
        <meta name="description" content="Global zone reservation service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout on="index">
        <div className={styles.reservationWrap}>
          <ReservationStatus/>
          <ReservationManagement/>
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
