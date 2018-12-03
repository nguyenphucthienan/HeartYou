import axios from 'axios';

import {
  ASK_QUESTION_URL,
  getNewsFeedUrl,
  getUnansweredQuestionsUrl,
  getAnsweredQuestionsUrl,
  getAnswerQuestionsUrl,
  getHeartOrUnheartQuestionUrl
} from '../config/api';

import {
  GET_FIRST_NEWS_FEED_SUCCEED,
  GET_FIRST_NEWS_FEED_FAIL,
  GET_MORE_NEWS_FEED_SUCCEED,
  GET_MORE_NEWS_FEED_FAIL,
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

export const getFirstNewsFeed = (token, userId) => async (dispatch) => {
  try {
    const url = getNewsFeedUrl(userId, 1, DEFAULT_PAGE_SIZE);
    const response = await axios.get(url, { headers: { authorization: `Bearer ${token}` } });

    dispatch({ type: GET_FIRST_NEWS_FEED_SUCCEED, payload: response.data });
  } catch (err) {
    dispatch({ type: GET_FIRST_NEWS_FEED_FAIL });
  }
};

export const getMoreNewsFeed = (token, userId, pageNumber) => async (dispatch) => {
  try {
    const url = getNewsFeedUrl(userId, pageNumber, DEFAULT_PAGE_SIZE);
    const response = await axios.get(url, { headers: { authorization: `Bearer ${token}` } });

    dispatch({ type: GET_MORE_NEWS_FEED_SUCCEED, payload: response.data });
  } catch (err) {
    dispatch({ type: GET_MORE_NEWS_FEED_FAIL });
  }
};

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

export const getFirstAnsweredQuestions = (token, userId) => async (dispatch) => {
  try {
    const url = getAnsweredQuestionsUrl(userId, 1, DEFAULT_PAGE_SIZE);
    const response = await axios.get(url, { headers: { authorization: `Bearer ${token}` } });

    dispatch({ type: GET_FIRST_ANSWERED_QUESTIONS_SUCCEED, payload: response.data });
  } catch (err) {
    dispatch({ type: GET_FIRST_ANSWERED_QUESTIONS_FAIL });
  }
};

export const getMoreAnsweredQuestions = (token, userId, pageNumber) => async (dispatch) => {
  try {
    const url = getAnsweredQuestionsUrl(userId, pageNumber, DEFAULT_PAGE_SIZE);
    const response = await axios.get(url, { headers: { authorization: `Bearer ${token}` } });

    dispatch({ type: GET_MORE_ANSWERED_QUESTIONS_SUCCEED, payload: response.data });
  } catch (err) {
    dispatch({ type: GET_MORE_ANSWERED_QUESTIONS_FAIL });
  }
};

export const askQuestion = (token, answerer, questionText) => async (dispatch) => {
  try {
    await axios.post(
      ASK_QUESTION_URL,
      { answerer, questionText },
      { headers: { authorization: `Bearer ${token}` } }
    );
  } catch (err) {
    //
  }
};

export const answerQuestion = (token, questionId, values) => async (dispatch) => {
  try {
    const url = getAnswerQuestionsUrl(questionId);
    await axios.post(url, values, { headers: { authorization: `Bearer ${token}` } });
  } catch (err) {
    //
  }
};

export const heartOrUnheartQuestion = (token, questionId) => async (dispatch) => {
  try {
    const url = getHeartOrUnheartQuestionUrl(questionId);
    await axios.post(url, null, { headers: { authorization: `Bearer ${token}` } });
  } catch (err) {
    //
  }
};
