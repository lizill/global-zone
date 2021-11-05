import produce from 'immer';

export const initialState = {
  reservations: [],
  reservationUsers: [],

  reservationLoading: false, // 예약 신청
  reservationDone: false,
  reservationError: null,
  loadReservationsLoading: false, // 예약 불러오기
  loadReservationsDone: false,
  loadReservationsError: null,
  cancelReservationLoading: false, // 예약 취소
  cancelReservationDone: false,
  cancelReservationError: null,
  reservationUsersLoading: false, // 예약한 유저 리스트
  reservationUsersDone: false,
  reservationUsersError: null,
  acceptReservationLoading: false, // 예약 수락
  acceptReservationDone: false,
  acceptReservationError: null,
};

export const RESERVATION_REQUEST = 'RESERVATION_REQUEST';
export const RESERVATION_SUCCESS = 'RESERVATION_SUCCESS';
export const RESERVATION_FAILURE = 'RESERVATION_FAILURE';

export const LOAD_RESERVATIONS_REQUEST = 'LOAD_RESERVATIONS_REQUEST';
export const LOAD_RESERVATIONS_SUCCESS = 'LOAD_RESERVATIONS_SUCCESS';
export const LOAD_RESERVATIONS_FAILURE = 'LOAD_RESERVATIONS_FAILURE';

export const CANCEL_RESERVATION_REQUEST = 'CANCEL_RESERVATION_REQUEST';
export const CANCEL_RESERVATION_SUCCESS = 'CANCEL_RESERVATION_SUCCESS';
export const CANCEL_RESERVATION_FAILURE = 'CANCEL_RESERVATION_FAILURE';

export const RESERVATION_USERS_REQUEST = 'RESERVATION_USERS_REQUEST';
export const RESERVATION_USERS_SUCCESS = 'RESERVATION_USERS_SUCCESS';
export const RESERVATION_USERS_FAILURE = 'RESERVATION_USERS_FAILURE';

export const ACCEPT_RESERVATION_REQUEST = 'ACCEPT_RESERVATION_REQUEST';
export const ACCEPT_RESERVATION_SUCCESS = 'ACCEPT_RESERVATION_SUCCESS';
export const ACCEPT_RESERVATION_FAILURE = 'ACCEPT_RESERVATION_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case RESERVATION_REQUEST:
      draft.reservationLoading = true;
      draft.reservationError = null;
      draft.reservationDone = false;
      break;
    case RESERVATION_SUCCESS:
      draft.reservationLoading = false;
      draft.reservationDone = true;
      break;
    case RESERVATION_FAILURE:
      draft.reservationLoading = false;
      draft.reservationError = action.error;
      break;

    case LOAD_RESERVATIONS_REQUEST:
      draft.loadReservationsLoading = true;
      draft.loadReservationsError = null;
      draft.loadReservationsDone = false;
      break;
    case LOAD_RESERVATIONS_SUCCESS:
      draft.loadReservationsLoading = false;
      draft.loadReservationsDone = true;
      draft.reservations = action.data;
      break;
    case LOAD_RESERVATIONS_FAILURE:
      draft.loadReservationsLoading = false;
      draft.loadReservationsError = action.error;
      break;

    case CANCEL_RESERVATION_REQUEST:
      draft.cancelReservationLoading = true;
      draft.cancelReservationError = null;
      draft.cancelReservationDone = false;
      break;
    case CANCEL_RESERVATION_SUCCESS:
      draft.cancelReservationLoading = false;
      draft.cancelReservationDone = true;
      break;
    case CANCEL_RESERVATION_FAILURE:
      draft.cancelReservationLoading = false;
      draft.cancelReservationError = action.error;
      break;

    case RESERVATION_USERS_REQUEST:
      draft.cancelReservationLoading = true;
      draft.cancelReservationError = null;
      draft.cancelReservationDone = false;
      break;
    case RESERVATION_USERS_SUCCESS:
      draft.cancelReservationLoading = false;
      draft.cancelReservationDone = true;
      draft.reservationUsers = action.data;
      break;
    case RESERVATION_USERS_FAILURE:
      draft.cancelReservationLoading = false;
      draft.cancelReservationError = action.error;
      break;

    case ACCEPT_RESERVATION_REQUEST:
      draft.acceptReservationLoading = true;
      draft.acceptReservationError = null;
      draft.acceptReservationDone = false;
      break;
    case ACCEPT_RESERVATION_SUCCESS:
      draft.acceptReservationLoading = false;
      draft.acceptReservationDone = true;
      break;
    case ACCEPT_RESERVATION_FAILURE:
      draft.acceptReservationLoading = false;
      draft.acceptReservationError = action.error;
      break;

    default:
      break;
  }
});

export default reducer;
