// schedule/show/1 다이나믹 라우터
import axios from 'axios';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Head from 'next/head';

import AppLayout from "../../../components/AppLayout";
import { LOAD_MY_INFO_REQUEST } from '../../../reducers/user';
import { LOAD_SCHEDULE_REQUEST } from '../../../reducers/schedule';
import { RESERVATION_USERS_REQUEST } from "../../../reducers/reservation";
import wrapper from '../../../store/configuresStore';
import ShowSchedule from "../../../components/schedule/ShowSchedule";

const Schedule = () => {
    const { schedule } = useSelector(state => state?.schedule);

    return (
        <AppLayout on={"schedule"}>
            <Head>
                <title>
                    글로벌존 | {schedule.user.name}
                </title>
            </Head>
            <ShowSchedule schedule={schedule}/>
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
    store.dispatch({
        type: RESERVATION_USERS_REQUEST,
        data: params.id,
    })
    store.dispatch(END);
    await store.sagaTask.toPromise();
});

export default Schedule;
