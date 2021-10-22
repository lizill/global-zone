import produce from 'immer';

export const initialState = {
  googleLogInLoading: false, // 구글 로그인 시도중
  googleLogInDone: false,
  googleLogInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  loadMyInfoLoading: false, // 내 정보 불러오기
  loadMyInfoDone: false,
  loadMyInfoError: null,
  signUpLoading: false, // 유학생 회원가입
  signUpDone: false,
  signUpError: null,
  logInLoading: false, // 유학생 로그인
  logInDone: false,
  logInError: null,
  loadForeignsLoading: false, // 유학생들 정보 불러오기
  loadForeignsDone: false,
  loadForeignsError: null,
  
  me: null,
  foreigns: null,
};

export const GOOGLE_LOG_IN_REQUEST = 'GOOGLE_LOG_IN_REQUEST';
export const GOOGLE_LOG_IN_SUCCESS = 'GOOGLE_LOG_IN_SUCCESS';
export const GOOGLE_LOG_IN_FAILURE = 'GOOGLE_LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOAD_FOREIGNS_REQUEST = 'LOAD_FOREIGNS_REQUEST';
export const LOAD_FOREIGNS_SUCCESS = 'LOAD_FOREIGNS_SUCCESS';
export const LOAD_FOREIGNS_FAILURE = 'LOAD_FOREIGNS_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case GOOGLE_LOG_IN_REQUEST:
      draft.googleLogInLoading = true;
      draft.googleLogInError = null;
      draft.googleLogInDone = false;
      break;
    case GOOGLE_LOG_IN_SUCCESS:
      draft.googleLogInLoading = false;
      draft.googleLogInDone = true;
      break;
    case GOOGLE_LOG_IN_FAILURE:
      draft.googleLogInLoading = false;
      draft.googleLogInError = action.error;
      break;

    case LOG_OUT_REQUEST:
      draft.logOutLoading = true;
      draft.logOutDone = false;
      draft.logOutError = null;
      break;
    case LOG_OUT_SUCCESS:
      draft.logOutLoading = false;
      draft.logOutDone = true;
      draft.me = null;
      break;
    case LOG_OUT_FAILURE:
      draft.logOutLoading = false;
      draft.logOutError = action.error;
      break;

    case LOAD_MY_INFO_REQUEST:
      draft.loadMyInfoLoading = true;
      draft.loadMyInfoDone = false;
      draft.loadMyInfoError = null;
      break;
    case LOAD_MY_INFO_SUCCESS:
      draft.loadMyInfoLoading = false;
      draft.loadMyInfoDone = true;
      draft.me = action.data;
      break;
    case LOAD_MY_INFO_FAILURE:
      draft.loadMyInfoLoading = false;
      draft.loadMyInfoError = action.error;
      break;

    case SIGN_UP_REQUEST:
      draft.signUpLoading = true;
      draft.signUpDone = false;
      draft.signUpError = null;
      break;
    case SIGN_UP_SUCCESS:
      draft.signUpLoading = false;
      draft.signUpDone = true;
      break;
    case SIGN_UP_FAILURE:
      draft.signUpLoading = false;
      draft.signUpError = action.error;
      break;

    case LOG_IN_REQUEST:
      draft.logInLoading = true;
      draft.logInDone = false;
      draft.logInError = null;
      break;
    case LOG_IN_SUCCESS:
      draft.logInLoading = false;
      draft.logInDone = true;
      break;
    case LOG_IN_FAILURE:
      draft.logInLoading = false;
      draft.logInError = action.error;
      break;

    case LOAD_FOREIGNS_REQUEST:
      draft.loadForeignsLoading = true;
      draft.loadForeignsDone = false;
      draft.loadForeignsError = null;
      break;
    case LOAD_FOREIGNS_SUCCESS:
      draft.loadForeignsLoading = false;
      draft.loadForeignsDone = true;
      draft.foreigns = action.data;
      break;
    case LOAD_FOREIGNS_FAILURE:
      draft.loadForeignsLoading = false;
      draft.loadForeignsError = action.error;
      break;
      
    default:
      break;
  }
});

export default reducer;
