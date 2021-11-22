import React, { useEffect } from "react";
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { useSelector, useDispatch } from "react-redux";

import styles from '../../styles/admin/admin.module.scss'
import { LOG_OUT_REQUEST } from "../../reducers/user";
import Loader from "../Loader";

const AdminLayout = ({ children, on }) => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state?.user);

  const onLogout = () => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }

  useEffect(() => {
    if(!me || me?.position !== 'admin') {
      if(me?.position === 'korean') {
        Router.push('/');
      } else {
        Router.push('/foreign/schedule');
      }
    }
  }, [me]);

  if(!me) return <Loader/>

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
            <Link href="/admin"><a className={on === 'index' ? styles.on : null}>스케줄 관리</a></Link>
            <Link href="/admin/user"><a className={on === 'user' ? styles.on : null}>유저 관리</a></Link>
          </menu>
        </header>
      </div>

      <main>
        { children }
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

export default AdminLayout;
