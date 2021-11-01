import produce from 'immer';
import moment from 'moment';

export const initialState = {
  selectedDate: moment().add(1, 'days').format('YYYYMMDD'),
  schedule: [
    {
      id: 1,
      date: '202111011000', // 'YYYYMMDDhhmm'
      user: {
        id: 2,
        name: '나카무라 시이아',
        position: 'japanese'
      },
      reservations: [
        {
          id: 1,
          email: 'lizill@g.yju.ac.kr',
          name: '박동현'
        }
      ]
    },
    {
      id: 2,
      date: '202111021100', // 'YYYYMMDDhhmm'
      user: {
        id: 2,
        name: '나카무라 시이아',
        position: 'japanese'
      },
      reservations: [
        {
          id: 1,
          email: 'lizill@g.yju.ac.kr',
          name: '박동현'
        }
      ]
    },
    {
      id: 3,
      date: '202111031000', // 'YYYYMMDDhhmm'
      user: {
        id: 2,
        name: '나카무라 시이아',
        position: 'japanese'
      },
      reservations: [
        {
          id: 1,
          email: 'lizill@g.yju.ac.kr',
          name: '박동현'
        }
      ]
    },
    {
      id: 4,
      date: '202111041000', // 'YYYYMMDDhhmm'
      user: {
        id: 2,
        name: '나카무라 시이아',
        position: 'japanese'
      },
      reservations: [
        {
          id: 1,
          email: 'lizill@g.yju.ac.kr',
          name: '박동현'
        }
      ]
    },
    {
      id: 5,
      date: '202111021100', // 'YYYYMMDDhhmm'
      user: {
        id: 3,
        name: '임채환',
        position: 'chinese'
      },
      reservations: []
    },
  ],

  createScheduleLoading: false, // 스케줄 생성
  createScheduleDone: false,
  createScheduleError: null,
};

export const SET_SELECTED_DATE = 'SET_SELECTED_DATE';

export const CREATE_SCHEDULE_REQUEST = 'CREATE_SCHEDULE_REQUEST';
export const CREATE_SCHEDULE_SUCCESS = 'CREATE_SCHEDULE_SUCCESS';
export const CREATE_SCHEDULE_FAILURE = 'CREATE_SCHEDULE_FAILURE';

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

    default:
      break;
  }
});

export default reducer;
