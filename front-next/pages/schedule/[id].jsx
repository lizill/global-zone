// schedule/1 다이나믹 라우터
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Head from 'next/head';
import moment from 'moment';

import AppLayout from "../../components/AppLayout";
import ReservationCard from "../../components/reservation/ReservationCard";
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_SCHEDULE_REQUEST } from '../../reducers/schedule';
import wrapper from '../../store/configuresStore';


const Schedule = () => {
    const router = useRouter();
    const { id } = router.query;
    const { schedule } = useSelector(state => state?.schedule);

    const description = () => {
        return `
            ${
                moment(schedule?.date, "YYYYMMDD").format('YYYY년 MM월 DD일')
            } ${
                moment(schedule?.date, "YYYYMMDDhhmm").format('hh시 mm분')
            } ~ ${
                moment(schedule?.date, 'YYYYMMDDhhmm').add(20, 'minutes').format('hh시 mm분')
            }
        `
    }

    return (
        <AppLayout on={"schedule"}>
            <Head>
                <title>
                    {schedule.user?.name} | 예약신청
                </title>
                <meta name="description" content={description} />

                {/* 미리보기 제목, 설명, 이미지, 링크 눌렀을때 가는 주소, ... */}
                <meta property="og:title" content={`${schedule.user?.name} | 예약신청`} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={'/favicon.ico'} />
                <meta property="og:url" content={`/schedule/${id}`} />
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
