// schedule/1 다이나믹 라우터
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Head from 'next/head';

import AppLayout from "../../components/AppLayout";
import ReservationCard from "../../components/reservation/ReservationCard";
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_SCHEDULE_REQUEST } from '../../reducers/schedule';
import wrapper from '../../store/configuresStore';

const Schedule = () => {
    const router = useRouter();
    const { id } = router.query;
    const { schedule } = useSelector(state => state?.schedule);

    return (
        <AppLayout on={"schedule"}>
            <Head>
                <title>
                    {schedule.user.name} | 예약신청
                </title>
                <meta name="description" content={schedule.date} />

                {/* 미리보기 제목, 설명, 이미지, 링크 눌렀을때 가는 주소, ... */}
                <meta property="og:title" content={`${schedule.user.name} | 예약신청`} />
                <meta property="og:description" content={schedule.date} />
                <meta property="og:image" content={'https://dong0110.com/favicon.ico'} />
                <meta property="og:url" content={`localhost:3000/schedule/${id}`} />
            </Head>
            <ReservationCard schedule={schedule} />
        </AppLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    store.dispatch({
        type: LOAD_SCHEDULE_REQUEST,
        data: params.id,
        // params.id 또는 query.id 로 useRouter에 접근가능
    });
    store.dispatch(END);
    await store.sagaTask.toPromise();
});

export default Schedule;
