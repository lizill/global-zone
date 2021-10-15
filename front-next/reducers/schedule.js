import produce from 'immer';

export const initialState = {
  selectedDate: null,
};

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
      
    default:
      break;
  }
});

export default reducer;
