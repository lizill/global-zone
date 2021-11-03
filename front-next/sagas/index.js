import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import userSaga from './user';
import scheduleSaga from "./schedule";
import reservationSaga from './reservation';
import { backUrl } from '../config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(scheduleSaga),
    fork(reservationSaga),
  ]);
}
