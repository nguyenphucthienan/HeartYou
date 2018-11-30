import {
  GET_FIRST_UNANSWERED_QUESTIONS_SUCCEED,
  GET_FIRST_UNANSWERED_QUESTIONS_FAIL,
  GET_MORE_UNANSWERED_QUESTIONS_SUCCEED,
  GET_MORE_UNANSWERED_QUESTIONS_FAIL
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
    case GET_FIRST_UNANSWERED_QUESTIONS_SUCCEED:
      return action.payload;
    case GET_FIRST_UNANSWERED_QUESTIONS_FAIL:
      return INITIAL_STATE;
    case GET_MORE_UNANSWERED_QUESTIONS_SUCCEED:
      return {
        pagination: action.payload.pagination,
        items: [...state.items, ...action.payload.items]
      };
    case GET_MORE_UNANSWERED_QUESTIONS_FAIL:
    default:
      return state;
  }
}
