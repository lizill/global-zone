import React from "react";
import Head from 'next/head';
import AppLayout from "../components/AppLayout";

const Admin = () => {
  return (
    <div>
      <Head>
        <title>글로벌존 | 관리 페이지</title>
        <meta name="description" content="Global zone reservation service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <AppLayout on="admin">
        관리자 페이지
      </AppLayout>
    </div>
  )
}

export default Admin;
