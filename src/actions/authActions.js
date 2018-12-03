import axios from 'axios';
import { ToastAndroid, AsyncStorage } from 'react-native';

import {
  REGISTER_URL,
  LOGIN_URL,
  MY_USER_INFO_URL,
  getUserInfoUrl
} from '../config/api';

import {
  LOGIN_USER_SUCCEED,
  LOGIN_USER_FROM_STORAGE_SUCCEED,
  LOGOUT_USER_SUCCEED,
  GET_MY_USER_INFO_SUCCEED,
} from './types';

export const registerUser = info => async (dispatch) => {
  try {
    await axios.post(REGISTER_URL, info);
    ToastAndroid.show('Register successfully! Now you can log in.', ToastAndroid.LONG);
  } catch (err) {
    ToastAndroid.show('Cannot register your new account. Please try again!', ToastAndroid.SHORT);
  }
};

export const loginUser = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post(LOGIN_URL, { username, password });
    const { token } = response.data;

    await AsyncStorage.removeItem('token');
    await AsyncStorage.setItem('token', token);

    dispatch({ type: LOGIN_USER_SUCCEED, payload: token });
  } catch (err) {
    ToastAndroid.show('Incorrect username and/or password. Please try again!', ToastAndroid.SHORT);
  }
};

export const loginUserFromStorage = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      dispatch({ type: LOGIN_USER_FROM_STORAGE_SUCCEED, payload: token });
    }
  } catch (err) {
    console.log('Storage Token not found.');
  }
};

export const logoutUser = () => async (dispatch) => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: LOGOUT_USER_SUCCEED });
};

export const getMyUserInfo = token => async (dispatch) => {
  try {
    const response = await axios.get(MY_USER_INFO_URL, { headers: { authorization: `Bearer ${token}` } });
    dispatch({ type: GET_MY_USER_INFO_SUCCEED, payload: response.data });
  } catch (err) {
    ToastAndroid.show('Get user info failed', ToastAndroid.SHORT);
  }
};

export const editUserInfo = (token, userId, info) => async (dispatch) => {
  try {
    const url = getUserInfoUrl(userId);
    await axios.post(url, info, { headers: { authorization: `Bearer ${token}` } });

    ToastAndroid.show('Your information was changed successfully!', ToastAndroid.SHORT);
  } catch (err) {
    ToastAndroid.show('Cannot change your information. Please try again!', ToastAndroid.SHORT);
  }
};
