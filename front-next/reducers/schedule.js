import produce from 'immer';
import moment from 'moment';

export const initialState = {
  selectedDate: moment().format('YYYYMMDD'), // default today
  schedules: [],
  schedule: {},
  newSchedule: {},

  createScheduleLoading: false, // 스케줄 생성
  createScheduleDone: false,
  createScheduleError: null,
  loadSchedulesLoading: false, // 스케줄 리스트 로드
  loadSchedulesDone: false,
  loadSchedulesError: null,
  loadScheduleLoading: false, // 스케줄 로드
  loadScheduleDone: false,
  loadScheduleError: null,
  foreignSchedulesLoading: false, // 외국인 스케줄 리스트 로드
  foreignSchedulesDone: false,
  foreignSchedulesError: null,
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

export const FOREIGN_SCHEDULES_REQUEST = 'FOREIGN_SCHEDULES_REQUEST';
export const FOREIGN_SCHEDULES_SUCCESS = 'FOREIGN_SCHEDULES_SUCCESS';
export const FOREIGN_SCHEDULES_FAILURE = 'FOREIGN_SCHEDULES_FAILURE';

export const SELECT_SCHEDULE_ACTION = 'SELECT_SCHEDULE_ACTION';

export const selectScheduleAction = (data) => ({
  type: SELECT_SCHEDULE_ACTION,
  data
});

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
      draft.newSchedule = action.data
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

    case FOREIGN_SCHEDULES_REQUEST:
      draft.foreignSchedulesLoading = true;
      draft.foreignSchedulesError = null;
      draft.foreignSchedulesDone = false;
      break;
    case FOREIGN_SCHEDULES_SUCCESS:
      draft.foreignSchedulesLoading = false;
      draft.foreignSchedulesDone = true;
      draft.schedules = action.data
      break;
    case FOREIGN_SCHEDULES_FAILURE:
      draft.foreignSchedulesLoading = false;
      draft.foreignSchedulesError = action.error;
      break;

    case SELECT_SCHEDULE_ACTION:
      draft.newSchedule = action.data;

    default:
      break;
  }
});

export default reducer;
