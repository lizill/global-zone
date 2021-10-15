import produce from 'immer';
import moment from 'moment';

export const initialState = {
  selectedDate: moment().format('YYYYMMDD'),
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
