import React, { useEffect } from "react";
import Head from 'next/head';
import axios from 'axios';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import AppLayout from "../../components/AppLayout";
import wrapper from '../../store/configuresStore';
import CalendarContainer from "../../components/schedule/CalendarConatainer";
import ScheduleList from "../../components/schedule/ScheduleList";
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { FOREIGN_SCHEDULES_REQUEST, SET_SELECTED_DATE } from '../../reducers/schedule';
import styles from '../../styles/schedule/schedule.module.scss';

const Schedule = () => {
  const dispatch = useDispatch();
  const { schedules } = useSelector(state => state?.schedule)

  useEffect(() => {
    dispatch({
      type: SET_SELECTED_DATE,
      data: moment(schedules[0]?.date, 'YYYYMMDD').format('YYYYMMDD')
    });
  }, [])

  return (
    <div>
      <Head>
        <title>글로벌존 | 스케줄 조회</title>
        <meta name="description" content="Global zone reservation service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout on="schedule">
        <div className={styles.divider}/>
        <div className={styles.schedule}>
          <CalendarContainer/>
          <ScheduleList/>
        </div>
      </AppLayout>
    </div>
  )
}

export default Schedule

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
    type: FOREIGN_SCHEDULES_REQUEST,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});
