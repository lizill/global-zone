import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  GOOGLE_LOG_IN_REQUEST, GOOGLE_LOG_IN_SUCCESS, GOOGLE_LOG_IN_FAILURE,
} from '../reducers/schedule';

function googleLogInApi() {
  return axios.get('http://localhost:8000/api/google/login');
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

export default function* userSaga() {
  yield all([
    fork(watchGoogleLogIn),
  ]);
}
