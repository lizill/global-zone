import React from "react";
import Head from 'next/head';

import LoginLayout from "../components/auth/LoginLayout";
import styles from '../styles/login/Login.module.scss';

const Foreign = () => {
  return (
    <div>
      <Head>
        <title>글로벌존 | 로그인</title>
        <meta name="description" content="Global zone reservation service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoginLayout on="foreign">
        <div className={styles.foreignWrap}>
          <form action="">
            <input placeholder="학번을 입력해주세요." required type="text" />
            <input placeholder="비밀번호를 입력해주세요." required type="password" />
            <button>Login</button>
          </form>
        </div>
      </LoginLayout>
    </div>
  )
}

export default Foreign;
