import React from "react";
import Head from 'next/head';
import AppLayout from "../components/AppLayout";

const Result = () => {
  return (
    <div>
      <Head>
        <title>글로벌존 | 결과 관리</title>
        <meta name="description" content="Global zone reservation service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <AppLayout on="result">
        결과 관리
      </AppLayout>
    </div>
  )
}

export default Result;
