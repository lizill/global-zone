import React, { useEffect } from "react";
import Head from 'next/head';
import axios from 'axios';
import { END } from 'redux-saga';
import { useSelector, useDispatch } from 'react-redux';
import moment from "moment";

import wrapper from '../../store/configuresStore';
import styles from '../../styles/admin/admin.module.scss';
import { LOAD_MY_INFO_REQUEST, LOAD_FOREIGN_LIST_REQUEST } from "../../reducers/user";
import { LOAD_SCHEDULES_REQUEST, SET_SELECTED_DATE } from "../../reducers/schedule";
import ScheduleControlContainer from "../../components/admin/ScheduleControlContainer";
import AdminLayout from "../../components/admin/AdminLayout";

const Admin = () => {
  const dispatch = useDispatch()
  const { schedules } = useSelector(state => state?.schedule)

  useEffect(() => {
    if (schedules.length !== 0) {
      dispatch({
        type: SET_SELECTED_DATE,
        data: moment(schedules[0]?.date, 'YYYYMMDD').format('YYYYMMDD')
      });
    }
  }, [])

  return (
    <div className={styles.adminWrap}>
      <Head>
        <title>글로벌존 | 관리자 페이지</title>
        <meta name="description" content="Global zone reservation service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AdminLayout on="index">
        <ScheduleControlContainer/>
      </AdminLayout>
    </div>
  )
}

export default Admin;

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
    type: LOAD_FOREIGN_LIST_REQUEST,
  });
  store.dispatch({
    type: LOAD_SCHEDULES_REQUEST,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});
