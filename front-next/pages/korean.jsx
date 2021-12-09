import React, {useEffect} from "react";
import Head from 'next/head';
import Router from 'next/router';
import { GoChevronRight } from 'react-icons/go';
import { useSelector } from "react-redux";
import axios from 'axios';

import LoginLayout from "../components/auth/LoginLayout";
import styles from '../styles/login/Login.module.scss';
import wrapper from "../store/configuresStore";
import {LOAD_MY_INFO_REQUEST} from "../reducers/user";
import {END} from "redux-saga";

const Korean = () => {
  const { me } = useSelector(state => state?.user)

  const onLogin = () => {
    axios.get('/google/login')
      .then((res) => {
        Router.push(res.data)
      })
      .catch((err) => {
        alert('로그인을 실패했습니다!', err)
      });
  }

  useEffect(() => {
    if (me && me.id) {
      if(me?.position === 'korean') {
        Router.push('/');
      } else if (me?.position === 'admin') {
        Router.push('/admin');
      } else {
        Router.push('/foreign');
      }
    }
  }, [me]);

  return (
    <div>
      <Head>
        <title>글로벌존 | 로그인</title>
        <meta name="description" content="Global zone reservation service" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" user-scalable="no" />
      </Head>
      
      <LoginLayout on="korean">
        <div className={styles.koreanWrap}>
          <div className={styles.login_gsuite}>
            <img src="/images/login_gsuite.png" alt="G-suite.png" />
          </div>
          <button className={styles.loginBtn} onClick={onLogin}>
            <div>
              <p>G-sute 계정으로 로그인하기</p>
              <p><GoChevronRight/></p>
            </div>
          </button>
          <p>@g.yju.ac.kr로 끝나는 G-suite 계정만 사용이 가능합니다.</p>
        </div>
      </LoginLayout>
    </div>
  )
}

export default Korean;

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
