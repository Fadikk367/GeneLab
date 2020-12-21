import axios from 'axios';
import { 
  GET_TEST_FAMILIES_SUCCESS,
  GET_TEST_FAMILIES_FAILURE,

  CREATE_TEST_FAMILY_SUCCESS,
  CREATE_TEST_FAMILY_FAILURE,

  DELETE_TEST_FAMILY_SUCCESS,
  DELETE_TEST_FAMILY_FAILURE,
} from '../constants';


export const getAllTestFamilies = () => async dispatch => {
  return axios.get('/tests')
    .then(response => {
      console.log(response);

      dispatch({
        type: GET_TEST_FAMILIES_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: GET_TEST_FAMILIES_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}


export const createTestFamily = familyName => async dispatch => {
  return axios.post('/tests', { familyName })
    .then(response => {
      console.log(response);

      dispatch({
        type: CREATE_TEST_FAMILY_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: CREATE_TEST_FAMILY_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}


export const deleteTestFamily = familyId => async dispatch => {
  return axios.delete(`/tests/${familyId}`)
    .then(response => {
      console.log(response);

      dispatch({
        type: DELETE_TEST_FAMILY_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: DELETE_TEST_FAMILY_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}