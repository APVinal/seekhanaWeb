import * as Cookies from 'js-cookie';

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const fetchRequest = () => ({
  type: FETCH_REQUEST
});

export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const fetchLoginSuccess = user => ({
  type: FETCH_LOGIN_SUCCESS,
  user
});

export const FETCH_LESSONS_SUCCESS = 'FETCH_LESSONS_SUCCESS';
export const fetchLessonsSuccess = lessons => ({
  type: FETCH_LESSONS_SUCCESS,
  lessons
});

export const FETCH_ERROR = 'FETCH_ERROR';
export const fetchError = error => ({
  type: FETCH_ERROR,
  error
});



