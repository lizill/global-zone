import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  GOOGLE_LOG_IN_REQUEST, GOOGLE_LOG_IN_SUCCESS, GOOGLE_LOG_IN_FAILURE,
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
  LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE,
} from '../reducers/user';

function googleLogInApi() {
  return axios.get('http://localhost:8000/api/google/login');
}
function* googleLogIn() {
  try {
    const result = yield call(googleLogInApi);
    yield put({
      type: GOOGLE_LOG_IN_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: GOOGLE_LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchGoogleLogIn() {
  yield takeLatest(GOOGLE_LOG_IN_REQUEST, googleLogIn);
}

function logOutApi() {
  return axios.post('/logout');
}
function* logOut() {
  try {
    yield call(logOutApi);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function loadMyInfoApi() {
  return axios.get('/user');
}
function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoApi);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

export default function* userSaga() {
  yield all([
    fork(watchGoogleLogIn),
    fork(watchLogOut),
    fork(watchLoadMyInfo),
  ]);
}
