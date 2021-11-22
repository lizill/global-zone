import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  CREATE_SCHEDULE_REQUEST, CREATE_SCHEDULE_SUCCESS, CREATE_SCHEDULE_FAILURE,
  LOAD_SCHEDULES_REQUEST, LOAD_SCHEDULES_SUCCESS, LOAD_SCHEDULES_FAILURE,
  LOAD_SCHEDULE_REQUEST, LOAD_SCHEDULE_SUCCESS, LOAD_SCHEDULE_FAILURE,
  FOREIGN_SCHEDULES_REQUEST, FOREIGN_SCHEDULES_SUCCESS, FOREIGN_SCHEDULES_FAILURE,
} from '../reducers/schedule';

function createScheduleApi(data) {
  return axios.post('/schedule', data);
}
function* createSchedule(action) {
  try {
    const result = yield call(createScheduleApi, action.data);
    yield all([
      put({ type: CREATE_SCHEDULE_SUCCESS, data: result.data }),
      put({ type: LOAD_SCHEDULES_REQUEST })
    ]);
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

function foreignSchedulesApi() {
  return axios.get('/schedules/foreign');
}
function* foreignSchedules() {
  try {
    const result = yield call(foreignSchedulesApi);
    yield put({
      type: FOREIGN_SCHEDULES_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: FOREIGN_SCHEDULES_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchForeignSchedules() {
  yield takeLatest(FOREIGN_SCHEDULES_REQUEST, foreignSchedules);
}

export default function* scheduleSaga() {
  yield all([
    fork(watchCreateSchedule),
    fork(watchLoadSchedules),
    fork(watchLoadSchedule),
    fork(watchForeignSchedules),
  ]);
}
