import axios from 'axios';

// export const GET_DIAGNOSTIC_LABORATORIES = 'GET_DIAGNOSTIC_LABORATORIES';
// export const GET_DIAGNOSTIC_LABORATORIES_REQUEST = 'GET_DIAGNOSTIC_LABORATORIES_REQUEST';
export const GET_DIAGNOSTIC_LABORATORIES_SUCCESS = 'GET_DIAGNOSTIC_LABORATORIES_SUCCESS';
export const GET_DIAGNOSTIC_LABORATORIES_FAILURE = 'GET_DIAGNOSTIC_LABORATORIES_FAILURE';

// export const CREATE_DIAGNOSTIC_LABORATORY = 'CREATE_DIAGNOSTIC_LABORATORY';
// export const CREATE_DIAGNOSTIC_LABORATORY_REQUEST = 'CREATE_DIAGNOSTIC_LABORATORY_REQUEST';
export const CREATE_DIAGNOSTIC_LABORATORY_SUCCESS = 'CREATE_DIAGNOSTIC_LABORATORY_SUCCESS';
export const CREATE_DIAGNOSTIC_LABORATORY_FAILURE = 'CREATE_DIAGNOSTIC_LABORATORY_FAILURE';

// export const UPDATE_DIAGNOSTIC_LABORATORY = 'UPDATE_DIAGNOSTIC_LABORATORY';
// export const UPDATE_DIAGNOSTIC_LABORATORY_REQUEST = 'UPDATE_DIAGNOSTIC_LABORATORY_REQUEST';
export const UPDATE_DIAGNOSTIC_LABORATORY_SUCCESS = 'UPDATE_DIAGNOSTIC_LABORATORY_SUCCESS';
export const UPDATE_DIAGNOSTIC_LABORATORY_FAILURE = 'UPDATE_DIAGNOSTIC_LABORATORY_FAILURE';

// export const DELETE_DIAGNOSTIC_LABORATORY = 'DELETE_DIAGNOSTIC_LABORATORY';
// export const DELETE_DIAGNOSTIC_LABORATORY_REQUEST = 'DELETE_DIAGNOSTIC_LABORATORY_REQUEST';
export const DELETE_DIAGNOSTIC_LABORATORY_SUCCESS = 'DELETE_DIAGNOSTIC_LABORATORY_SUCCESS';
export const DELETE_DIAGNOSTIC_LABORATORY_FAILURE = 'DELETE_DIAGNOSTIC_LABORATORY_FAILURE';


export const getAllDiagnosticLaboratories = () => async dispatch => {
  return axios.get('/laboratories')
    .then(response => {
      console.log(response);

      dispatch({
        type: GET_DIAGNOSTIC_LABORATORIES_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: GET_DIAGNOSTIC_LABORATORIES_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}


export const createDiagnosticLaboratory = (laboratoryName, laboratoryDescription) => async dispatch => {
  return axios.post('/laboratories', { laboratoryName, laboratoryDescription })
    .then(response => {
      console.log(response);

      dispatch({
        type: CREATE_DIAGNOSTIC_LABORATORY_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: CREATE_DIAGNOSTIC_LABORATORY_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}


export const deleteDiagnosticLaboratory = laboratoryId => async dispatch => {
  return axios.delete(`/laboratories/${laboratoryId}`)
    .then(response => {
      console.log(response);

      dispatch({
        type: DELETE_DIAGNOSTIC_LABORATORY_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: DELETE_DIAGNOSTIC_LABORATORY_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}