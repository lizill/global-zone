import React from "react";
import Head from 'next/head';
import AppLayout from "../components/AppLayout";

const Schedule = () => {
  return (
    <div>
      <Head>
        <title>글로벌존 | 스케줄 조회</title>
        <meta name="description" content="Global zone reservation service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout on="schedule">
        {/* <CalendarContainer/>
        <ScheduleList/> */}
        스케줄
      </AppLayout>
    </div>
  )
}

export default Schedule;
