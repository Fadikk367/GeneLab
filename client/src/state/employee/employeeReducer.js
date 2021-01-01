import {
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAILURE,

  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_FAILURE,

  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAILURE,
} from './employeeActions';


const initialState = {
  employeeList: []
}

const employeeReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employeeList: action.payload.employees
      }
    case GET_EMPLOYEES_FAILURE:
      return {
        ...state
      }
    case CREATE_EMPLOYEE_SUCCESS:
      const createdEmployee = action.payload.createdEmployee;

      return {
        ...state,
        employeeList: [...state.employeeList, createdEmployee]
      }
    case CREATE_EMPLOYEE_FAILURE:
      return {
        ...state,
      }
    case DELETE_EMPLOYEE_SUCCESS:
      const deletedEmployee = action.payload.deletedEmployee;

      return {
        ...state,
        employeeList: state.employeeList.filter(employee => employee.id !== deletedEmployee.id)
      }
    case DELETE_EMPLOYEE_FAILURE:
      return {
        ...state,
      }
    default:
      return state;
  }
}

export default employeeReducer;