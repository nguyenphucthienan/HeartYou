import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import unansweredQuestionsReducer from './unansweredQuestionsReducer';
import answeredQuestionsReducer from './answeredQuestionsReducer';
import followingReducer from './followingReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  unansweredQuestions: unansweredQuestionsReducer,
  answeredQuestions: answeredQuestionsReducer,
  following: followingReducer
});
