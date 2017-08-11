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

export const ADD_LESSON_SUCCESS = 'ADD_LESSON_SUCCESS';
export const addLessonSuccess = user => ({
  type: ADD_LESSON_SUCCESS,
  user
})

export const FETCH_ERROR = 'FETCH_ERROR';
export const fetchError = error => ({
  type: FETCH_ERROR,
  error
});

export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const setAccessToken = accessToken => ({
  type: SET_ACCESS_TOKEN,
  accessToken
});

export const REMOVE_ACCESS_TOKEN = 'REMOVE_ACCESS_TOKEN';
export const removeAccessToken = () => ({
  type: REMOVE_ACCESS_TOKEN
});

export const ADD_LESSON = 'ADD_LESSON';
export const addLesson = lesson => ({
  type: ADD_LESSON,
  lesson
});

export const CHECK_ANSWER = 'CHECK_ANSWER';
export const checkAnswer = (multiAnswer, pronunAnswer, currentCap, questionCount) => ({
  type: CHECK_ANSWER,
  multiAnswer,
  pronunAnswer,
  currentCap,
  questionCount
});

export const NEXT_QUESTION = 'NEXT_QUESTION';
export const nextQuestion = () => ({
  type: NEXT_QUESTION
});

export const fetchUser = accessToken => dispatch => {
  dispatch(fetchRequest());
  dispatch(setAccessToken(accessToken));
  fetch(`/api/users/${accessToken}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }).then(res => {
    if (!res.ok) {
      if (res.status === 401) {
      // Unauthorized, clear the cookie and go to
      // the login page
        Cookies.remove('accessToken');
        dispatch(removeAccessToken());
        return;
      }
        throw new Error(res.statusText);
      }
      return res.json();
    }).then(currentUser => {
     dispatch(fetchLoginSuccess(currentUser))
    }).catch(err => {
      dispatch(fetchError(err));
    });
}

export const fetchLessons = accessToken => dispatch => {
  dispatch(fetchRequest());
  fetch('/api/lessons', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }).then(response => {
    if(!response.ok) {
      return Promise.reject(response.statusText);
    }
    return response.json();
  }).then(lessons => {
    dispatch(fetchLessonsSuccess(lessons));
  }).catch(error => {
    dispatch(fetchError(error));
  });
}

export const updateUserLessons = (accessToken, userId, lesson) => dispatch => {
  dispatch(fetchRequest());
  fetch(`/api/users/${userId}/lessons/`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(lesson)
  }).then(response => {
    if(!response.ok) {
      console.log('yup it failed');
      return Promise.reject(response.statusText);
    }
    return response.json();
  }).then(user => {
    dispatch(addLessonSuccess(user));
  }).catch(error => {
    dispatch(fetchError(error));
  })
}

// export const fetchLesson = (accessToken, lessonId) => dispatch => {
//   fetch(`/api/lessons/${lessonId}`, {
//     headers: {
//       'Authorization': `Bearer ${accessToken}`
//     } 
//   }).then(response => {
//     if(!response.ok) {
//       return Promise.reject(response.statusText);
//     }
//     return response.json();
//   }).then(lesson => {
//     dispatch(fetchLessonSuccess(lesson));
//   }).catch(error => {
//     dispatch(fetchError(error));
//   });
// }

// export const addLesson = (accessToken, )