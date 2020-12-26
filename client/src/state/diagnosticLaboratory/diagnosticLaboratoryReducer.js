import {
  GET_DIAGNOSTIC_LABORATORIES_SUCCESS,
  GET_DIAGNOSTIC_LABORATORIES_FAILURE,

  CREATE_DIAGNOSTIC_LABORATORY_SUCCESS,
  CREATE_DIAGNOSTIC_LABORATORY_FAILURE,

  DELETE_DIAGNOSTIC_LABORATORY_SUCCESS,
  DELETE_DIAGNOSTIC_LABORATORY_FAILURE,
} from './diagnosticLaboratoryActions';


const initialState = {
  laboratoryList: []
}

const diagnosticLaboratoryReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_DIAGNOSTIC_LABORATORIES_SUCCESS:
      return {
        ...state,
        laboratoryList: action.payload.diagnosticLaboratories
      }
    case GET_DIAGNOSTIC_LABORATORIES_FAILURE:
      return {
        ...state,
        laboratoryList: []
      }
    case CREATE_DIAGNOSTIC_LABORATORY_SUCCESS:
      const createdDiagnosticLaboratory = action.payload.createdDiagnosticLaboratory
      return {
        ...state,
        laboratoryList: [...state.laboratoryList, createdDiagnosticLaboratory]
      }
    case CREATE_DIAGNOSTIC_LABORATORY_FAILURE:
      return {
        ...state,
      }
    case DELETE_DIAGNOSTIC_LABORATORY_SUCCESS:
      const deletedDiagnosticLaboratory = action.payload.deletedDiagnosticLaboratory
      return {
        ...state,
        laboratoryList: state.laboratoryList.filter(material => material.id !== deletedDiagnosticLaboratory.id)
      }
    case DELETE_DIAGNOSTIC_LABORATORY_FAILURE:
      return {
        ...state,
      }
    default:
      return state;
  }
}

export default diagnosticLaboratoryReducer;