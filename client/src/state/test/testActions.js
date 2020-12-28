import axios from 'axios';

// export const GET_TESTS = 'GET_TESTS';
// export const GET_TESTS_REQUEST = 'GET_TESTS_REQUEST';
export const GET_TESTS_SUCCESS = 'GET_TESTS_SUCCESS';
export const GET_TESTS_FAILURE = 'GET_TESTS_FAILURE';

// export const CREATE_TEST = 'CREATE_TEST';
// export const CREATE_TEST_REQUEST = 'CREATE_TEST_REQUEST';
export const CREATE_TEST_SUCCESS = 'CREATE_TEST_SUCCESS';
export const CREATE_TEST_FAILURE = 'CREATE_TEST_FAILURE';

// export const UPDATE_TEST = 'UPDATE_TEST';
// export const UPDATE_TEST_REQUEST = 'UPDATE_TEST_REQUEST';
export const UPDATE_TEST_SUCCESS = 'UPDATE_TEST_SUCCESS';
export const UPDATE_TEST_FAILURE = 'UPDATE_TEST_FAILURE';

// export const DELETE_TEST = 'DELETE_TEST';
// export const DELETE_TEST_REQUEST = 'DELETE_TEST_REQUEST';
export const DELETE_TEST_SUCCESS = 'DELETE_TEST_SUCCESS';
export const DELETE_TEST_FAILURE = 'DELETE_TEST_FAILURE';


export const getAllTests = () => async dispatch => {
  return axios.get('/tests')
    .then(response => {
      console.log(response);

      dispatch({
        type: GET_TESTS_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: GET_TESTS_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}


export const createTest = testAttributes => async dispatch => {
  return axios.post('/tests', testAttributes)
    .then(response => {
      console.log(response);

      dispatch({
        type: CREATE_TEST_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: CREATE_TEST_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}


export const deleteTest = categoryId => async dispatch => {
  return axios.delete(`/tests/${categoryId}`)
    .then(response => {
      console.log(response);

      dispatch({
        type: DELETE_TEST_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: DELETE_TEST_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}