import React from "react";
import Head from 'next/head';
import LoginLayout from "../components/auth/LoginLayout";
import Router from 'next/router';
import styles from '../styles/Login.module.scss'
import { GoChevronRight } from 'react-icons/go'

const Korean = () => {
  const onLogin = () => {
    Router.push('/');
  }

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