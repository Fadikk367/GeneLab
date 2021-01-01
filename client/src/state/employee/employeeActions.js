import axios from 'axios';

// export const GET_EMPLOYEES = 'GET_EMPLOYEES';
// export const GET_EMPLOYEES_REQUEST = 'GET_EMPLOYEES_REQUEST';
export const GET_EMPLOYEES_SUCCESS = 'GET_EMPLOYEES_SUCCESS';
export const GET_EMPLOYEES_FAILURE = 'GET_EMPLOYEES_FAILURE';

// export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';
// export const CREATE_EMPLOYEE_REQUEST = 'CREATE_EMPLOYEE_REQUEST';
export const CREATE_EMPLOYEE_SUCCESS = 'CREATE_EMPLOYEE_SUCCESS';
export const CREATE_EMPLOYEE_FAILURE = 'CREATE_EMPLOYEE_FAILURE';

// export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
// export const UPDATE_EMPLOYEE_REQUEST = 'UPDATE_EMPLOYEE_REQUEST';
export const UPDATE_EMPLOYEE_SUCCESS = 'UPDATE_EMPLOYEE_SUCCESS';
export const UPDATE_EMPLOYEE_FAILURE = 'UPDATE_EMPLOYEE_FAILURE';

// export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
// export const DELETE_EMPLOYEE_REQUEST = 'DELETE_EMPLOYEE_REQUEST';
export const DELETE_EMPLOYEE_SUCCESS = 'DELETE_EMPLOYEE_SUCCESS';
export const DELETE_EMPLOYEE_FAILURE = 'DELETE_EMPLOYEE_FAILURE';


export const getAllEmployees = () => async dispatch => {
  return axios.get('/employees')
    .then(response => {
      console.log(response);

      dispatch({
        type: GET_EMPLOYEES_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: GET_EMPLOYEES_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}


export const createEmployee = ({ personalData, employeeData }) => async dispatch => {
  return axios.post('/employees', { personalData, employeeData })
    .then(response => {
      console.log(response);

      dispatch({
        type: CREATE_EMPLOYEE_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: CREATE_EMPLOYEE_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}


export const deleteEmployee = employeeId => async dispatch => {
  return axios.delete(`/employees/${employeeId}`)
    .then(response => {
      console.log(response);

      dispatch({
        type: DELETE_EMPLOYEE_SUCCESS,
        payload: response.data,
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: DELETE_EMPLOYEE_FAILURE,
        payload: 'nie udalo sie zalogowac...'
      });

      return Promise.reject();
    });
}