import {
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAILURE,

  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_FAILURE,

  UPDATE_EMPLOYEE_SUCCESS,
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
    case UPDATE_EMPLOYEE_SUCCESS:
      const updatedEmployee = action.payload;
      const idx = state.employeeList.findIndex(employee => employee.id === updatedEmployee.id);
      const employee = state.employeeList.splice(idx, 1)[0];

      return {
        ...state,
        employeeList: [...state.employeeList, { ...employee, bonus: updatedEmployee.bonus }],
      }
    default:
      return state;
  }
}

export default employeeReducer;