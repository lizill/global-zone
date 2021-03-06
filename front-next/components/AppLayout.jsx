import React, { useEffect, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from 'next/link';
import Router from 'next/router';

import styles from '../styles/layout/AppLayout.module.scss';
import { LOG_OUT_REQUEST } from "../reducers/user";
import Loader from './Loader';

const AppLayout = ({ children, on }) => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state?.user);

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  const onHome = useCallback(() => {
    if(me?.position === 'korean') {
      Router.push('/');
    } else {
      Router.push('/foreign/schedule');
    }
  }, [me])

  useEffect(() => {
    if(!me) {
      Router.push('/korean');
    }
  }, [me]);

  if(!me) return <Loader/>

  return (
    <div className={styles.appLayout}>
      <header>
        <div className={styles.menuLogo}>
          <button onClick={onHome}>
            <img src="/images/logo_intro_globalzone.gif" alt="logo.gif" />
          </button>
          <button className={styles.logoutBtn} onClick={onLogout}>
            <img src="/images/google_icon.png" alt="icon.png" width="20" />
            <p>Logout</p>
          </button>
        </div>
        {me?.position === 'korean' &&
          <div className={styles.menu}>
            <Link href="/"><a className={on === 'index' ? styles.on : null}>예약 조회</a></Link>
            <Link href="/schedule"><a className={on === 'schedule' ? styles.on : null}>스케줄 조회</a></Link>
            <Link href="/result"><a className={on === 'result' ? styles.on : null}>결과 관리</a></Link>
          </div>}
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

export default memo(AppLayout);
