import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import schedule from './schedule';
import reservation from "./reservation";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      // console.log('HYDRATE', action);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        schedule,
        reservation,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
