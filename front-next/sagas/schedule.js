import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  CREATE_SCHEDULE_REQUEST, CREATE_SCHEDULE_SUCCESS, CREATE_SCHEDULE_FAILURE,
} from '../reducers/schedule';

function createScheduleApi(data) {
  console.log(data)
  return axios.post('/schedule', data);
}
function* createSchedule(action) {
  try {
    console.log(action.data)
    yield call(createScheduleApi, action.data);
    yield put({
      type: CREATE_SCHEDULE_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: CREATE_SCHEDULE_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchCreateSchedule() {
  yield takeLatest(CREATE_SCHEDULE_REQUEST, createSchedule);
}

export default function* scheduleSaga() {
  yield all([
    fork(watchCreateSchedule),
  ]);
}
