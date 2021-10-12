import React from "react";
import Head from 'next/head';
import AppLayout from "../components/AppLayout";
import axios from 'axios';
import { END } from 'redux-saga';

import RankComponent from "../components/result/RankComponent";
import ResultComponent from "../components/result/ResultComponent";
import wrapper from '../store/configuresStore';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const Result = () => {
  return (
    <div>
      <Head>
        <title>글로벌존 | 결과 관리</title>
        <meta name="description" content="Global zone reservation service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <AppLayout on="result">
        <RankComponent/>
        <ResultComponent/>
      </AppLayout>
    </div>
  )
}

export default Result;

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
