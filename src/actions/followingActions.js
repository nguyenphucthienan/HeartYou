import axios from 'axios';

import {
  getFollowingListUrl,
  getFollowOrUnfollowUrl
} from '../config/api';

import {
  GET_FIRST_FOLLOWING_LIST_SUCCEED,
  GET_FIRST_FOLLOWING_LIST_FAILED,
  GET_MORE_FOLLOWING_LIST_SUCCEED,
  GET_MORE_FOLLOWING_LIST_FAILED,
  FOLLOW_OR_UNFOLLOW_USER_SUCCEED
} from './types';

const DEFAULT_PAGE_SIZE = 10;

export const getFirstFollowingList = userId => async (dispatch) => {
  try {
    const url = getFollowingListUrl(userId, 1, DEFAULT_PAGE_SIZE);
    const response = await axios.get(url);

    dispatch({ type: GET_FIRST_FOLLOWING_LIST_SUCCEED, payload: response.data });
  } catch (err) {
    dispatch({ type: GET_FIRST_FOLLOWING_LIST_FAILED });
  }
};

export const getMoreFollowingList = (userId, pageNumber) => async (dispatch) => {
  try {
    const url = getFollowingListUrl(userId, pageNumber, DEFAULT_PAGE_SIZE);
    const response = await axios.get(url);

    dispatch({ type: GET_MORE_FOLLOWING_LIST_SUCCEED, payload: response.data });
  } catch (err) {
    dispatch({ type: GET_MORE_FOLLOWING_LIST_FAILED });
  }
};

export const followOrUnfollowUser = (token, userId) => async (dispatch) => {
  try {
    const url = getFollowOrUnfollowUrl(userId);
    await axios.post(url, null, { headers: { authorization: `Bearer ${token}` } });

    dispatch({ type: FOLLOW_OR_UNFOLLOW_USER_SUCCEED, payload: userId });
  } catch (err) {
    //
  }
};
