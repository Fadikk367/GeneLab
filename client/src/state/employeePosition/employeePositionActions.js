import axios from 'api/axiosInstance';

// export const GET_EMPLOYEE_POSITIONS = 'GET_EMPLOYEE_POSITIONS';
// export const GET_EMPLOYEE_POSITIONS_REQUEST = 'GET_EMPLOYEE_POSITIONS_REQUEST';
export const GET_EMPLOYEE_POSITIONS_SUCCESS = 'GET_EMPLOYEE_POSITIONS_SUCCESS';
export const GET_EMPLOYEE_POSITIONS_FAILURE = 'GET_EMPLOYEE_POSITIONS_FAILURE';

// export const CREATE_EMPLOYEE_POSITION = 'CREATE_EMPLOYEE_POSITION';
// export const CREATE_EMPLOYEE_POSITION_REQUEST = 'CREATE_EMPLOYEE_POSITION_REQUEST';
export const CREATE_EMPLOYEE_POSITION_SUCCESS = 'CREATE_EMPLOYEE_POSITION_SUCCESS';
export const CREATE_EMPLOYEE_POSITION_FAILURE = 'CREATE_EMPLOYEE_POSITION_FAILURE';

// export const UPDATE_EMPLOYEE_POSITION = 'UPDATE_EMPLOYEE_POSITION';
// export const UPDATE_EMPLOYEE_POSITION_REQUEST = 'UPDATE_EMPLOYEE_POSITION_REQUEST';
export const UPDATE_EMPLOYEE_POSITION_SUCCESS = 'UPDATE_EMPLOYEE_POSITION_SUCCESS';
export const UPDATE_EMPLOYEE_POSITION_FAILURE = 'UPDATE_EMPLOYEE_POSITION_FAILURE';

// export const DELETE_EMPLOYEE_POSITION = 'DELETE_EMPLOYEE_POSITION';
// export const DELETE_EMPLOYEE_POSITION_REQUEST = 'DELETE_EMPLOYEE_POSITION_REQUEST';
export const DELETE_EMPLOYEE_POSITION_SUCCESS = 'DELETE_EMPLOYEE_POSITION_SUCCESS';
export const DELETE_EMPLOYEE_POSITION_FAILURE = 'DELETE_EMPLOYEE_POSITION_FAILURE';


export const getAllEmployeePositions = () => async dispatch => {
  return axios.get('/employees/positions')
    .then(response => {
      console.log(response);

      dispatch({
        type: GET_EMPLOYEE_POSITIONS_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: GET_EMPLOYEE_POSITIONS_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}


export const createEmployeePosition = (positionName, positionSalary, positionDescription) => async dispatch => {
  return axios.post('/employees/positions', { positionName, positionSalary, positionDescription })
    .then(response => {
      console.log(response);

      dispatch({
        type: CREATE_EMPLOYEE_POSITION_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: CREATE_EMPLOYEE_POSITION_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}


export const deleteEmployeePosition = positionId => async dispatch => {
  return axios.delete(`/employees/positions/${positionId}`)
    .then(response => {
      console.log(response);

      dispatch({
        type: DELETE_EMPLOYEE_POSITION_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: DELETE_EMPLOYEE_POSITION_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}