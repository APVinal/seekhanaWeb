import{
FETCH_REQUEST,
FETCH_LOGIN_SUCCESS,
FETCH_ERROR
} from '../actions/actions';

const initialState = {
  loading: false,
  currentUser: null
};

export default (state=initialState, action) => {
  if (action.type === FETCH_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  }else if (action.type === FETCH_LOGIN_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      currentUser: action.user
    });
  }
}
