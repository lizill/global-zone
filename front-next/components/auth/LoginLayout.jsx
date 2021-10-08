import React from 'react';
import Link from 'next/link';
import styles from '../../styles/Login.module.scss';

const LoginLayout = ({ children, on }) => {
  return (
    <div className={styles.layout}>
      <header>
        <div className={styles.menu}>
          <button>
            <img src="/images/logo_intro_globalzone.gif" alt="logo.gif" />
          </button>
          <ul>
            <li className={on === "korean" ? styles.on : null}>
              <Link href="/korean"><a>한국인 학생</a></Link>
            </li>
            <li className={on === "foreign" ? styles.on : null}>
              <Link href="/foreign"><a>유학생</a></Link>
            </li>
          </ul>
        </div>
      </header>

      <main>
        <div className={styles.mainWrap}>
          <h1>Global Zone <span>Reservation Service</span></h1>
          <p>글로벌존 예약시스템에 오신 것을 환영합니다.</p>
          { children }
        </div>
      </main>


      <footer>
        <p>COPYRIGHT© YEUNGJIN UNIVERSITY. All RIGHTS RESERVED.</p>
      </footer>
    </div>
  )
}

export default LoginLayout;
