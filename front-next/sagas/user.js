import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  GOOGLE_LOG_IN_REQUEST, GOOGLE_LOG_IN_SUCCESS, GOOGLE_LOG_IN_FAILURE,
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
  LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE,
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
  LOAD_FOREIGN_LIST_REQUEST, LOAD_FOREIGN_LIST_SUCCESS, LOAD_FOREIGN_LIST_FAILURE,
} from '../reducers/user';

function googleLogInApi() {
  return axios.get('/google/login');
}
function* googleLogIn() {
  try {
    yield call(googleLogInApi);
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
  return axios.post('/auth/logout');
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

function signUpApi(data) {
  return axios.post('/auth/register', data);
}
function* signUp(action) {
  try {
    // console.log(action.data)
    yield call(signUpApi, action.data);
    yield all([
      put({ type: SIGN_UP_SUCCESS }),
      put({ type: LOAD_FOREIGN_LIST_REQUEST })
    ]);
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function logInApi(data) {
  return axios.post('/auth/login', data);
}
function* logIn(action) {
  try {
    // console.log(action.data)
    yield call(logInApi, action.data);
    yield all([
        put({ type: LOG_IN_SUCCESS }),
        put({type: LOAD_MY_INFO_REQUEST})
    ]);
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function loadForeignListApi() {
  return axios.get('/users/foreign');
}
function* loadForeignList() {
  try {
    const result = yield call(loadForeignListApi);
    yield put({
      type: LOAD_FOREIGN_LIST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: LOAD_FOREIGN_LIST_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchLoadForeignList() {
  yield takeLatest(LOAD_FOREIGN_LIST_REQUEST, loadForeignList);
}

export default function* userSaga() {
  yield all([
    fork(watchGoogleLogIn),
    fork(watchLogOut),
    fork(watchLoadMyInfo),
    fork(watchSignUp),
    fork(watchLogIn),
    fork(watchLoadForeignList),
  ]);
}
