import axios from 'api/axiosInstance';

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
        message: 'Pracownik został dodany'
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: CREATE_EMPLOYEE_FAILURE,
        payload: {},
        message: 'Nie udało się dodać pracownika'
      });

      return Promise.reject();
    });
}


export const updateEmployee = (employeeId, bonus) => async dispatch => {
  return axios.put(`/employees/${employeeId}`, { bonus })
    .then(response => {
      console.log(response);

      dispatch({
        type: UPDATE_EMPLOYEE_SUCCESS,
        payload: response.data,
        message: 'Pracownik został zaktualizowany',
      });

      return Promise.resolve();
    })
    .catch(err => {
      console.log(err);

      dispatch({
        type: UPDATE_EMPLOYEE_FAILURE,
        payload: {},
        message: 'Nie udało się edytować premii'
      });

      return Promise.reject();
    });
}