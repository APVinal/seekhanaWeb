import{
FETCH_REQUEST,
FETCH_LOGIN_SUCCESS,
FETCH_LESSONS_SUCCESS,
ADD_LESSON_SUCCESS,
FETCH_ERROR,
SET_ACCESS_TOKEN,
REMOVE_ACCESS_TOKEN,
ADD_LESSON,
CHECK_ANSWER,
NEXT_QUESTION
} from '../actions/actions';

const initialState = {
  loading: false,
  googleId: null,
  userLessons: [],
  accessToken: null,
  error: null,
  lessons: [],
  currentLesson: null,
  showResults: false,
  multiAnswer: null,
  pronunciationAnswer: null,
  cappedLength: 50,
  currentCap: 25,
  questionCount: 0
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
      googleId: action.user[0].googleId,
      userLessons: action.user[0].lessons
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
    });
  } else if (action.type === ADD_LESSON) {
    return Object.assign({}, state, {
      currentLesson: action.lesson
    });
  } else if (action.type === ADD_LESSON_SUCCESS) {
    console.log('reducer hit for add lesson success', action);
    return Object.assign({}, state, {
      loading: false,
      error: null,
      userLessons: action.user[0].lessons,
      currentLesson: action.lesson._id
    });
  } else if (action.type === CHECK_ANSWER) {
    return Object.assign({}, state, {
      showResults: true,
      multiAnswer: action.multiAnswer,
      pronunciationAnswer: action.pronunAnswer,
      currentCap: action.currentCap,
      questionCount: action.questionCount
    });
  } else if (action.type === NEXT_QUESTION) {
    return Object.assign({}, state, {
      showResults: false,
      inputAnswer: null,
      selectedAnswer: false
    });
  }
  console.log('reducer state', state);
  return state;
}
