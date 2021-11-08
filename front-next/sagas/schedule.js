import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  CREATE_SCHEDULE_REQUEST, CREATE_SCHEDULE_SUCCESS, CREATE_SCHEDULE_FAILURE,
  LOAD_SCHEDULES_REQUEST, LOAD_SCHEDULES_SUCCESS, LOAD_SCHEDULES_FAILURE,
  LOAD_SCHEDULE_REQUEST, LOAD_SCHEDULE_SUCCESS, LOAD_SCHEDULE_FAILURE,
  ENTER_SCHEDULE_REQUEST, ENTER_SCHEDULE_SUCCESS, ENTER_SCHEDULE_FAILURE,
} from '../reducers/schedule';

function createScheduleApi(data) {
  return axios.post('/schedule', data);
}
function* createSchedule(action) {
  try {
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

function loadSchedulesApi() {
  return axios.get('/schedules');
}
function* loadSchedules() {
  try {
    const result = yield call(loadSchedulesApi);
    yield put({
      type: LOAD_SCHEDULES_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: LOAD_SCHEDULES_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchLoadSchedules() {
  yield takeLatest(LOAD_SCHEDULES_REQUEST, loadSchedules);
}

function loadScheduleApi(data) {
  return axios.get('/schedule/' + data);
}
function* loadSchedule(action) {
  try {
    const result = yield call(loadScheduleApi, action.data);
    yield put({
      type: LOAD_SCHEDULE_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: LOAD_SCHEDULE_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchLoadSchedule() {
  yield takeLatest(LOAD_SCHEDULE_REQUEST, loadSchedule);
}

function enterScheduleApi(data) {
  return axios.patch('/schedule/enter', data);
}
function* enterSchedule(action) {
  try {
    const result = yield call(enterScheduleApi, action.data);
    yield put({
      type: ENTER_SCHEDULE_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: ENTER_SCHEDULE_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchEnterSchedule() {
  yield takeLatest(ENTER_SCHEDULE_REQUEST, enterSchedule);
}

export default function* scheduleSaga() {
  yield all([
    fork(watchCreateSchedule),
    fork(watchLoadSchedules),
    fork(watchLoadSchedule),
    fork(watchEnterSchedule),
  ]);
}
