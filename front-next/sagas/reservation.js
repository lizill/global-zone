import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  RESERVATION_REQUEST, RESERVATION_SUCCESS, RESERVATION_FAILURE,
  LOAD_RESERVATIONS_REQUEST, LOAD_RESERVATIONS_SUCCESS, LOAD_RESERVATIONS_FAILURE,
  CANCEL_RESERVATION_REQUEST, CANCEL_RESERVATION_SUCCESS, CANCEL_RESERVATION_FAILURE,
  RESERVATION_USERS_REQUEST, RESERVATION_USERS_SUCCESS, RESERVATION_USERS_FAILURE,
  ACCEPT_RESERVATION_REQUEST, ACCEPT_RESERVATION_SUCCESS, ACCEPT_RESERVATION_FAILURE,
} from '../reducers/reservation';

function reservationApi(data) {
  return axios.post('/reservation', data);
}
function* reservation(action) {
  try {
    yield call(reservationApi, action.data);
    yield put({
      type: RESERVATION_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: RESERVATION_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchReservation() {
  yield takeLatest(RESERVATION_REQUEST, reservation);
}

function loadReservationsApi() {
  return axios.get('/reservations');
}
function* loadReservations() {
  try {
    const result = yield call(loadReservationsApi);
    yield put({
      type: LOAD_RESERVATIONS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: LOAD_RESERVATIONS_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchLoadReservations() {
  yield takeLatest(LOAD_RESERVATIONS_REQUEST, loadReservations);
}

function cancelReservationApi(data) {
  return axios.delete('/reservation/' + data);
}
function* cancelReservation(action) {
  try {
    yield call(cancelReservationApi, action.data);
    yield all([
        put({ type: CANCEL_RESERVATION_SUCCESS }),
        put({ type: LOAD_RESERVATIONS_REQUEST })
    ]);
  } catch (err) {
    yield put({
      type: CANCEL_RESERVATION_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchCancelReservation() {
  yield takeLatest(CANCEL_RESERVATION_REQUEST, cancelReservation);
}

function reservationUsersApi(data) {
  return axios.get('/reservations/' + data);
}
function* reservationUsers(action) {
  try {
    const result = yield call(reservationUsersApi, action.data);
    yield put({
      type: RESERVATION_USERS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: RESERVATION_USERS_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchReservationUsers() {
  yield takeLatest(RESERVATION_USERS_REQUEST, reservationUsers);
}

function acceptReservationApi(data) {
  return axios.patch('/reservation', data);
}
function* acceptReservation(action) {
  try {
    yield call(acceptReservationApi, action.data);
    yield all([
        put({ type: ACCEPT_RESERVATION_SUCCESS }),
        put({ type: RESERVATION_USERS_REQUEST, data: action.data.schedule_id })
      ]);
  } catch (err) {
    yield put({
      type: ACCEPT_RESERVATION_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchAcceptReservation() {
  yield takeLatest(ACCEPT_RESERVATION_REQUEST, acceptReservation);
}

export default function* scheduleSaga() {
  yield all([
    fork(watchReservation),
    fork(watchLoadReservations),
    fork(watchCancelReservation),
    fork(watchReservationUsers),
    fork(watchAcceptReservation),
  ]);
}
