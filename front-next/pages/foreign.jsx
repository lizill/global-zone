import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from 'next/head';
import Router from "next/router";

import LoginLayout from "../components/auth/LoginLayout";
import styles from '../styles/login/Login.module.scss';
import {LOAD_MY_INFO_REQUEST, LOG_IN_REQUEST} from "../reducers/user";
import wrapper from "../store/configuresStore";
import axios from "axios";
import {END} from "redux-saga";

const Foreign = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { me, logInError } = useSelector(state => state?.user)
  const dispatch = useDispatch();

  const onChangeId = (e) => {
    setId(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch({
      type: LOG_IN_REQUEST,
      data: { email: id, password }
    });
  }

  useEffect(() => {
    if (me && me.id) {
      if(me?.position === 'admin') {
        Router.push('/admin');
      } else {
        Router.push('/');
      }
    }
  }, [me]);

  return (
    <div>
      <Head>
        <title>글로벌존 | 로그인</title>
        <meta name="description" content="Global zone reservation service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoginLayout on="foreign">
        <div className={styles.foreignWrap}>
          <form onSubmit={onSubmit}>
            <input placeholder="학번을 입력해주세요." required type="text" onChange={onChangeId} />
            <input placeholder="비밀번호를 입력해주세요." min="8" required type="password" onChange={onChangePassword} />
            <p style={{ color: "red" }}>{logInError && logInError.error}</p>
            <button>Login</button>
          </form>
        </div>
      </LoginLayout>
    </div>
  )
}

export default Foreign;

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
