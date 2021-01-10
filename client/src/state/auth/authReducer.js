import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from './authActions';


const initialState = {
  isAuthentificated: isLoggedIn(),
  token: getTokenFromLocalStorage() || null,
  user: getUserDataFromLocalStorage() || null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      const { authToken, user } = action.payload;

      saveAuthTokenInLocalStorage(authToken);
      saveUserDataInLocalStorage(user);
      
      return {
        ...state,
        isAuthentificated: true,
        token: authToken,
        user,
      }
    case USER_LOGOUT:
      clearStorage();
      
      return {
        ...state,
        isAuthentificated: false,
        token: null,
        user: null,
      }
    default:
      return state;
  }
}

export default authReducer;


function getTokenFromLocalStorage() {
  return localStorage.getItem('authToken')
}

function getUserDataFromLocalStorage() {
  return JSON.parse(localStorage.getItem('user'));
}

function clearStorage() {
  localStorage.setItem('authToken', null);
  localStorage.setItem('user', null);
}

function isLoggedIn() {
  return (!!localStorage.getItem('authToken') && JSON.parse(!!localStorage.getItem('user')));
}

function saveUserDataInLocalStorage(userData) {
  localStorage.setItem(
    'user',
    JSON.stringify(userData),
  );
}

function saveAuthTokenInLocalStorage(token) {
  localStorage.setItem('authToken', token);
}
