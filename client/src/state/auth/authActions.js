import axios from "axios";

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const USER_LOGOUT = 'USER_LOGOUT';


export const login = ({ email, password }) => async dispatch => {
  return axios.post('/auth/login', { email, password })
    .then(res => {
      console.error(res.data);

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: res.data,
      });

      return Promise.resole();
    })
    .catch(err => {
      console.error(err);

      dispatch({
        type: USER_LOGIN_FAILURE,
        payload: err.message,
      });

      return Promise.reject();
    });
}


export const logout = () => {
  return {
    type: USER_LOGOUT,
    payload: null,
  }
}