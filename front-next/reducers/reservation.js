import produce from 'immer';

export const initialState = {
  reservations: [],

  reservationLoading: false, // 예약 신청
  reservationDone: false,
  reservationError: null,
  loadReservationsLoading: false, // 예약 불러오기
  loadReservationsDone: false,
  loadReservationsError: null,
};

export const RESERVATION_REQUEST = 'RESERVATION_REQUEST';
export const RESERVATION_SUCCESS = 'RESERVATION_SUCCESS';
export const RESERVATION_FAILURE = 'RESERVATION_FAILURE';

export const LOAD_RESERVATIONS_REQUEST = 'LOAD_RESERVATIONS_REQUEST';
export const LOAD_RESERVATIONS_SUCCESS = 'LOAD_RESERVATIONS_SUCCESS';
export const LOAD_RESERVATIONS_FAILURE = 'LOAD_RESERVATIONS_FAILURE';

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

    default:
      break;
  }
});

export default reducer;
