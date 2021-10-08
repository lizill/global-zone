import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import ReservationStatus from '../components/reservation/ReservationStatus';
import ReservationManagement from '../components/reservation/ReservationManagement';
import styles from '../styles/Reservation.module.scss';

export default function Home() {
  const [me, setMe] = useState();

  // useEffect(() => {
  //   if (!(me && me.id)) {
  //     Router.push('/korean');
  //   }
  // }, [me && me.id]);

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
