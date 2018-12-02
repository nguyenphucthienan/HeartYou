import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import newsFeedReducer from './newsFeedReducer';
import unansweredQuestionsReducer from './unansweredQuestionsReducer';
import answeredQuestionsReducer from './answeredQuestionsReducer';
import followingReducer from './followingReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  newsFeed: newsFeedReducer,
  unansweredQuestions: unansweredQuestionsReducer,
  answeredQuestions: answeredQuestionsReducer,
  following: followingReducer
});
