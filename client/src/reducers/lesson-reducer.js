import{
FETCH_REQUEST,
FETCH_LOGIN_SUCCESS,
FETCH_LESSONS_SUCCESS,
FETCH_ERROR,
SET_ACCESS_TOKEN,
REMOVE_ACCESS_TOKEN
} from '../actions/actions';

const initialState = {
  loading: false,
  currentUser: null,
  googleId: null,
  userLessons: [],
  accessToken: null,
  error: null,
  lessons: []

};

export default (state=initialState, action) => {
  if (action.type === FETCH_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  } else if (action.type === FETCH_LOGIN_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      error: null,
      currentUser: action.user.name,
      googleId: action.user.googleId,
      userLessons: action.user.lessons
    });
  } else if (action.type === FETCH_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === SET_ACCESS_TOKEN) {
    return Object.assign({}, state, {
      accessToken: action.accessToken
    });
  } else if (action.type === REMOVE_ACCESS_TOKEN) {
    return Object.assign({}, state, {
      accessToken: null
    });
  } else if (action.type === FETCH_LESSONS_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      error: null, 
      lessons: action.lessons
    })
  }
}
