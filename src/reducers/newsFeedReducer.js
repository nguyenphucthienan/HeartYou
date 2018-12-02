import {
  GET_FIRST_NEWS_FEED_SUCCEED,
  GET_FIRST_NEWS_FEED_FAIL,
  GET_MORE_NEWS_FEED_SUCCEED,
  GET_MORE_NEWS_FEED_FAIL
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
    case GET_FIRST_NEWS_FEED_SUCCEED:
      return action.payload;
    case GET_FIRST_NEWS_FEED_FAIL:
      return INITIAL_STATE;
    case GET_MORE_NEWS_FEED_SUCCEED:
      return {
        pagination: action.payload.pagination,
        items: [...state.items, ...action.payload.items]
      };
    case GET_MORE_NEWS_FEED_FAIL:
    default:
      return state;
  }
}
