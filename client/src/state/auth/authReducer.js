import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from './authActions';


const initialState = {
  isAuthentificated: false,
  token: null,
  user: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      const { authToken, user } = action.payload;

      return {
        ...state,
        isAuthentificated: true,
        token: authToken,
        user,
      }
    case USER_LOGOUT:
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