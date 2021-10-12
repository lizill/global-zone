import React from "react";
import Head from 'next/head';
import axios from 'axios';
import { END } from 'redux-saga';

import AppLayout from "../components/AppLayout";
import wrapper from '../store/configuresStore';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const Schedule = () => {
  return (
    <div>
      <Head>
        <title>글로벌존 | 스케줄 조회</title>
        <meta name="description" content="Global zone reservation service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout on="schedule">
        {/* <CalendarContainer/>
        <ScheduleList/> */}
        스케줄
      </AppLayout>
    </div>
  )
}

export default Schedule;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});
