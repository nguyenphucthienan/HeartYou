import {
  GET_FIRST_FOLLOWING_LIST_SUCCEED,
  GET_FIRST_FOLLOWING_LIST_FAILED,
  GET_MORE_FOLLOWING_LIST_SUCCEED,
  GET_MORE_FOLLOWING_LIST_FAILED,
  FOLLOW_OR_UNFOLLOW_USER_SUCCEED
} from '../actions/types';

const INITIAL_STATE = {
  pagination: {
    pageNumber: 1,
    pageSize: 10
  },
  items: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_FIRST_FOLLOWING_LIST_SUCCEED:
      return action.payload;
    case GET_FIRST_FOLLOWING_LIST_FAILED:
      return INITIAL_STATE;
    case GET_MORE_FOLLOWING_LIST_SUCCEED:
      return {
        pagination: action.payload.pagination,
        items: [...state.items, ...action.payload.items]
      };
    case FOLLOW_OR_UNFOLLOW_USER_SUCCEED:
      return {
        ...state,
        items: state.items.filter(user => user._id !== action.payload)
      };
    case GET_MORE_FOLLOWING_LIST_FAILED:
    default:
      return state;
  }
}
