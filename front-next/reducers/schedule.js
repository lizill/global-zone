import produce from 'immer';
import moment from 'moment';

export const initialState = {
  selectedDate: moment().add(1, 'days').format('YYYYMMDD'),
  schedules: [],
  schedule: {},

  createScheduleLoading: false, // 스케줄 생성
  createScheduleDone: false,
  createScheduleError: null,
  loadSchedulesLoading: false, // 스케줄 리스트 로드
  loadSchedulesDone: false,
  loadSchedulesError: null,
  loadScheduleLoading: false, // 스케줄 로드
  loadScheduleDone: false,
  loadScheduleError: null,
};

export const SET_SELECTED_DATE = 'SET_SELECTED_DATE';

export const CREATE_SCHEDULE_REQUEST = 'CREATE_SCHEDULE_REQUEST';
export const CREATE_SCHEDULE_SUCCESS = 'CREATE_SCHEDULE_SUCCESS';
export const CREATE_SCHEDULE_FAILURE = 'CREATE_SCHEDULE_FAILURE';

export const LOAD_SCHEDULES_REQUEST = 'LOAD_SCHEDULES_REQUEST';
export const LOAD_SCHEDULES_SUCCESS = 'LOAD_SCHEDULES_SUCCESS';
export const LOAD_SCHEDULES_FAILURE = 'LOAD_SCHEDULES_FAILURE';

export const LOAD_SCHEDULE_REQUEST = 'LOAD_SCHEDULE_REQUEST';
export const LOAD_SCHEDULE_SUCCESS = 'LOAD_SCHEDULE_SUCCESS';
export const LOAD_SCHEDULE_FAILURE = 'LOAD_SCHEDULE_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case SET_SELECTED_DATE:
      draft.selectedDate = action.data;
      break;

    case CREATE_SCHEDULE_REQUEST:
      draft.createScheduleLoading = true;
      draft.createScheduleError = null;
      draft.createScheduleDone = false;
      break;
    case CREATE_SCHEDULE_SUCCESS:
      draft.createScheduleLoading = false;
      draft.createScheduleDone = true;
      break;
    case CREATE_SCHEDULE_FAILURE:
      draft.createScheduleLoading = false;
      draft.createScheduleError = action.error;
      break;

    case LOAD_SCHEDULES_REQUEST:
      draft.loadSchedulesLoading = true;
      draft.loadSchedulesError = null;
      draft.loadSchedulesDone = false;
      break;
    case LOAD_SCHEDULES_SUCCESS:
      draft.loadSchedulesLoading = false;
      draft.loadSchedulesDone = true;
      draft.schedules = action.data
      break;
    case LOAD_SCHEDULES_FAILURE:
      draft.loadSchedulesLoading = false;
      draft.loadSchedulesError = action.error;
      break;

    case LOAD_SCHEDULE_REQUEST:
      draft.loadScheduleLoading = true;
      draft.loadScheduleError = null;
      draft.loadScheduleDone = false;
      break;
    case LOAD_SCHEDULE_SUCCESS:
      draft.loadScheduleLoading = false;
      draft.loadScheduleDone = true;
      draft.schedule = action.data
      break;
    case LOAD_SCHEDULE_FAILURE:
      draft.loadScheduleLoading = false;
      draft.loadScheduleError = action.error;
      break;

    default:
      break;
  }
});

export default reducer;
