import {
  GET_EMPLOYEE_POSITIONS_SUCCESS,
  GET_EMPLOYEE_POSITIONS_FAILURE,

  CREATE_EMPLOYEE_POSITION_SUCCESS,
  CREATE_EMPLOYEE_POSITION_FAILURE,

  DELETE_EMPLOYEE_POSITION_SUCCESS,
  DELETE_EMPLOYEE_POSITION_FAILURE,
} from './employeePositionActions';


const initialState = {
  positionList: []
}

const employeePositionReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_EMPLOYEE_POSITIONS_SUCCESS:
      return {
        ...state,
        positionList: action.payload.employeePositions
      }
    case GET_EMPLOYEE_POSITIONS_FAILURE:
      return {
        ...state,
        positionList: []
      }
    case CREATE_EMPLOYEE_POSITION_SUCCESS:
      const createdEmployeePosition = action.payload.createdEmployeePosition
      return {
        ...state,
        positionList: [...state.positionList, createdEmployeePosition]
      }
    case CREATE_EMPLOYEE_POSITION_FAILURE:
      return {
        ...state,
      }
    case DELETE_EMPLOYEE_POSITION_SUCCESS:
      const deletedEmployeePosition = action.payload.deletedEmployeePosition
      return {
        ...state,
        positionList: state.positionList.filter(position => position.id !== deletedEmployeePosition.id)
      }
    case DELETE_EMPLOYEE_POSITION_FAILURE:
      return {
        ...state,
      }
    default:
      return state;
  }
}

export default employeePositionReducer;