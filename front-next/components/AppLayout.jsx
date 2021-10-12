import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';

import styles from '../styles/AppLayout.module.scss';
import { LOG_OUT_REQUEST } from "../reducers/user";

const AppLayout = ({ children, on }) => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);

  const onLogout = () => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }

  useEffect(() => {
    if(!me) {
      Router.push('/korean');
    }
  }, [me])

  return (
    <div className={styles.appLayout}>
      <header>
        <div className={styles.menuLogo}>
          <button>         
            <img src="/images/logo_intro_globalzone.gif" alt="logo.gif" />
          </button>
          <button className={styles.logoutBtn} onClick={onLogout}>
            <img src="/images/google_icon.png" alt="icon.png" width="20" />
            <p>Logout</p>
          </button>
        </div>
        <div className={styles.menu}>
          <Link href="/"><a className={on === 'index' ? styles.on : null}>예약 조회</a></Link>
          <Link href="/schedule"><a className={on === 'schedule' ? styles.on : null}>스케줄 조회</a></Link>
          <Link href="/result"><a className={on === 'result' ? styles.on : null}>결과 관리</a></Link>
          <Link href="/admin"><a className={on === 'admin' ? styles.on : null}>관리자 페이지</a></Link>
        </div>
      </header>

      <main>
        { children }
      </main>

      <footer>
        <p>
          담당전화 053-940-5625 41527 대구광역시 북구 복현로 35 (복현2동 218)<br/>
          COPYRIGHT© YEUNGJIN UNIVERSITY. All RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  )
}

export default AppLayout;
