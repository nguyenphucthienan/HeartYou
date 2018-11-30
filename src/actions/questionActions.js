import axios from 'axios';

import {
  getUnansweredQuestionsUrl
} from '../config/api';

import {
  GET_FIRST_UNANSWERED_QUESTIONS_SUCCEED,
  GET_FIRST_UNANSWERED_QUESTIONS_FAIL,
  GET_MORE_UNANSWERED_QUESTIONS_SUCCEED,
  GET_MORE_UNANSWERED_QUESTIONS_FAIL,
  GET_FIRST_ANSWERED_QUESTIONS_SUCCEED,
  GET_FIRST_ANSWERED_QUESTIONS_FAIL,
  GET_MORE_ANSWERED_QUESTIONS_SUCCEED,
  GET_MORE_ANSWERED_QUESTIONS_FAIL
} from './types';

const DEFAULT_PAGE_SIZE = 10;

export const getFirstUnansweredQuestions = (token, userId) => async (dispatch) => {
  try {
    const url = getUnansweredQuestionsUrl(userId, 1, DEFAULT_PAGE_SIZE);
    const response = await axios.get(url, { headers: { authorization: `Bearer ${token}` } });

    dispatch({ type: GET_FIRST_UNANSWERED_QUESTIONS_SUCCEED, payload: response.data });
  } catch (err) {
    dispatch({ type: GET_FIRST_UNANSWERED_QUESTIONS_FAIL });
  }
};

export const getMoreUnansweredQuestions = (token, userId, pageNumber) => async (dispatch) => {
  try {
    const url = getUnansweredQuestionsUrl(userId, pageNumber, DEFAULT_PAGE_SIZE);
    const response = await axios.get(url, { headers: { authorization: `Bearer ${token}` } });

    dispatch({ type: GET_MORE_UNANSWERED_QUESTIONS_SUCCEED, payload: response.data });
  } catch (err) {
    dispatch({ type: GET_MORE_UNANSWERED_QUESTIONS_FAIL });
  }
};
