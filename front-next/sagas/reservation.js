import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  RESERVATION_REQUEST, RESERVATION_SUCCESS, RESERVATION_FAILURE,
  LOAD_RESERVATIONS_REQUEST, LOAD_RESERVATIONS_SUCCESS, LOAD_RESERVATIONS_FAILURE,
  CANCEL_RESERVATION_REQUEST, CANCEL_RESERVATION_SUCCESS, CANCEL_RESERVATION_FAILURE,
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
    yield put({
      type: CANCEL_RESERVATION_SUCCESS,
    });
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

export default function* scheduleSaga() {
  yield all([
    fork(watchReservation),
    fork(watchLoadReservations),
    fork(watchCancelReservation),
  ]);
}
