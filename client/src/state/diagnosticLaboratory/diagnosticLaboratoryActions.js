import axios from 'api/axiosInstance';

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

// export const GET_WORK_OCCUPANCY = 'GET_WORK_OCCUPANCY';
// export const GET_WORK_OCCUPANCY_REQUEST = 'GET_WORK_OCCUPANCY_REQUEST';
export const GET_WORK_OCCUPANCY_SUCCESS = 'GET_WORK_OCCUPANCY_SUCCESS';
export const GET_WORK_OCCUPANCY_FAILURE = 'GET_WORK_OCCUPANCY_FAILURE';

// export const GET_PENDING_EXAMINATIONS = 'GET_PENDING_EXAMINATIONS';
// export const GET_PENDING_EXAMINATIONS_REQUEST = 'GET_PENDING_EXAMINATIONS_REQUEST';
export const GET_PENDING_EXAMINATIONS_SUCCESS = 'GET_PENDING_EXAMINATIONS_SUCCESS';
export const GET_PENDING_EXAMINATIONS_FAILURE = 'GET_PENDING_EXAMINATIONS_FAILURE';

export const CREATE_EXAMINATION_RESULT_SUCCESS = 'CREATE_EXAMINATION_RESULT_SUCCESS';
export const CREATE_EXAMINATION_RESULT_FAILURE = 'CREATE_EXAMINATION_RESULT_FAILURE';


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


export const createDiagnosticLaboratory = laboratoryAttributes => async dispatch => {
  return axios.post('/laboratories', laboratoryAttributes)
    .then(response => {
      console.log(response);

      dispatch({
        type: CREATE_DIAGNOSTIC_LABORATORY_SUCCESS,
        payload: response.data,
        message: 'Laboratorium zostało utworzone'
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: CREATE_DIAGNOSTIC_LABORATORY_FAILURE,
        payload: 'nie udalo sie zalogowac...',
        message: 'Nie udało się utworzyć laboratorium'
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
        message: 'Laboratorium zostało usunięte'
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: DELETE_DIAGNOSTIC_LABORATORY_FAILURE,
        payload: 'nie udalo sie zalogowac...',
        message: 'Nie udało się usunąć laboratorium'
      });

      return Promise.reject();
    });
}


export const getLaboratoriesWorkOccupancy = () => async dispatch => {
  return axios.get('/laboratories/occupancy')
    .then(res => {
      dispatch({
        type: GET_WORK_OCCUPANCY_SUCCESS,
        payload: res.data.workOccupancyById,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.error(err);
      dispatch({
        type: GET_WORK_OCCUPANCY_FAILURE,
        payload: null,
      });

      return Promise.reject();
    })
}


export const getPendingExaminations = laboratoryId => async dispatch => {
  return axios.get(`/laboratories/examinations`)
    .then(res => {
      dispatch({
        type: GET_PENDING_EXAMINATIONS_SUCCESS,
        payload: res.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.error(err);
      dispatch({
        type: GET_PENDING_EXAMINATIONS_FAILURE,
        payload: null,
      });

      return Promise.reject();
    })
}


export const createExaminationResult = (examinationId, result) => async dispatch => {
  return axios.post(`/examinations/results/${examinationId}`, { result })
    .then(res => {
      dispatch({
        type: CREATE_EXAMINATION_RESULT_SUCCESS,
        payload: res.data,
        message: 'Wynik badania został zapisany',
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.error(err);
      dispatch({
        type: CREATE_EXAMINATION_RESULT_FAILURE,
        payload: err.message,
        message: 'Nie udało się zapisać wyniku',
      });

      return Promise.reject();
    })
}