// Development
const API_URL = 'http://192.168.248.2:3000/api';

// Production
// const API_URL = 'http://heartyouapi.herokuapp.com/api';

export const REGISTER_URL = `${API_URL}/auth/register`;
export const CHECK_USERNAME_URL = `${API_URL}/auth/check-username`;
export const LOGIN_URL = `${API_URL}/auth/login`;
export const MY_USER_INFO_URL = `${API_URL}/auth/me`;

export const getUnansweredQuestionsUrl = (userId, pageNumber, pageSize) => (
  `${API_URL}/users/${userId}/unanswered-questions?pageNumber=${pageNumber}&pageSize=${pageSize}`
);

export const getAnsweredQuestionsUrl = (userId, pageNumber, pageSize) => (
  `${API_URL}/users/${userId}/answered-questions?pageNumber=${pageNumber}&pageSize=${pageSize}`
);

export const getAnswerQuestionsUrl = questionId => (
  `${API_URL}/questions/${questionId}/answer`
);

export const getHeartOrUnheartQuestionUrl = questionId => (
  `${API_URL}/questions/${questionId}/heart/`
);
