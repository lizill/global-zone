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
  ],
};

export const SET_SELETED_DATE = 'SET_SELETED_DATE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case SET_SELETED_DATE:
      draft.selectedDate = action.data;
      break;

    default:
      break;
  }
});

export default reducer;
