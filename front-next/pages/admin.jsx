import React, { useState, useEffect } from "react";
import Head from 'next/head';
import Router from 'next/router';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { END } from 'redux-saga';

import wrapper from '../store/configuresStore';
import styles from '../styles/admin/admin.module.scss'
import CreateUser from "../components/admin/CreateUser";
import { LOG_OUT_REQUEST, LOAD_MY_INFO_REQUEST, LOAD_FOREIGN_LIST_REQUEST } from "../reducers/user";
import {LOAD_SCHEDULES_REQUEST} from "../reducers/schedule";
import ScheduleControlContainer from "../components/admin/ScheduleControlContainer";

const Admin = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState('schedule');
  const { me } = useSelector(state => state.user);

  const onLogout = () => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }

  useEffect(() => {
    if(!me || me.position !== 'admin') {
      Router.push('/korean');
    }
  }, [me])

  return (
    <div className={styles.adminWrap}>
      <Head>
        <title>글로벌존 | 관리 페이지</title>
        <meta name="description" content="Global zone reservation service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ backgroundColor: 'white' }}>
        <header>
          <div className={styles.menu}>
            <button>
              <img src="/images/logo_intro_globalzone.gif" alt="logo.gif" />
            </button>
            <button className={styles.logoutBtn} onClick={onLogout}>
              <img src="/images/google_icon.png" alt="icon.png" width="20" />
              <p>Logout</p>
            </button>
          </div>
          <menu>
            <button className={show === 'schedule' ? styles.onActive : null} onClick={() => setShow('schedule')}>스케줄 관리</button>
            <button className={show === 'user' ? styles.onActive : null} onClick={() => setShow('user')}>유저 관리</button>
          </menu>
        </header>
      </div>

      <main>
        {show === 'schedule' && <ScheduleControlContainer/>}
        {show === 'user' && <CreateUser/>}
      </main>

      <div style={{ backgroundColor: "white", borderTop: '1px solid #e6e6e6' }}>
        <footer>
          <p>
            담당전화 053-940-5625 41527 대구광역시 북구 복현로 35 (복현2동 218)<br/>
            COPYRIGHT© YEUNGJIN UNIVERSITY. All RIGHTS RESERVED.
          </p>
        </footer>
      </div>
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
