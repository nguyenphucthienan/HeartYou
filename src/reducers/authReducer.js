import {
  LOGIN_USER_SUCCEED,
  LOGIN_USER_FROM_STORAGE_SUCCEED,
  LOGOUT_USER_SUCCEED,
  GET_MY_USER_INFO_SUCCEED
} from '../actions/types';

const INITIAL_STATE = {
  token: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_USER_SUCCEED:
    case LOGIN_USER_FROM_STORAGE_SUCCEED:
      return { ...state, token: action.payload };
    case LOGOUT_USER_SUCCEED:
      return { token: null };
    case GET_MY_USER_INFO_SUCCEED:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
