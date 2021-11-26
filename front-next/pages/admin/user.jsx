import React from "react";
import Head from 'next/head';
import axios from 'axios';
import { END } from 'redux-saga';

import wrapper from '../../store/configuresStore';
import styles from '../../styles/admin/admin.module.scss'
import CreateUser from "../../components/admin/CreateUser";
import ForeignList from "../../components/admin/ForeignList";
import { LOAD_MY_INFO_REQUEST, LOAD_FOREIGN_LIST_REQUEST } from "../../reducers/user";
import AdminLayout from "../../components/admin/AdminLayout";

const Admin = () => {
  return (
    <div className={styles.adminWrap}>
      <Head>
        <title>글로벌존 | 유저 관리</title>
        <meta name="description" content="Global zone reservation service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AdminLayout on="user">
        <div className={styles.userWrap}>
          <CreateUser/>
          <ForeignList/>
        </div>
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
  store.dispatch(END);
  await store.sagaTask.toPromise();
});
