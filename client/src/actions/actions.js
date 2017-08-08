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

export const FETCH_ERROR = 'FETCH_ERROR';
export const fetchError = error => ({
  type: FETCH_ERROR,
  error
});


export const fetchLogin = () => dispatch => {
  const url = 'http://seekhana.herokuapp.com' || 'http://localhost:8080';
  const accessToken = Cookies.get('accessToken');

  dispatch(fetchRequest());

  if(accessToken){
    return fetch(`${url}/api/me`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(res => {
      if (!res.ok) {
        if (res.status === 401){
          Cookies.remove('accessToken');
          return;
        }
        throw new Error(res.statusText);
      }
      return res.json();
    }).then(_user => {
      const user = _user.user;
      return dispatch(fetchLoginSuccess(user));
    }).catch(error => 
      dispatch(fetchError(error)));
  }

}

