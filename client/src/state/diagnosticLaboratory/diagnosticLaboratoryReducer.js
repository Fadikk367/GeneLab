import {
  GET_DIAGNOSTIC_LABORATORIES_SUCCESS,
  GET_DIAGNOSTIC_LABORATORIES_FAILURE,

  GET_PENDING_EXAMINATIONS_SUCCESS,
  GET_WORK_OCCUPANCY_SUCCESS,

  CREATE_DIAGNOSTIC_LABORATORY_SUCCESS,
  CREATE_DIAGNOSTIC_LABORATORY_FAILURE,

  DELETE_DIAGNOSTIC_LABORATORY_SUCCESS,
  DELETE_DIAGNOSTIC_LABORATORY_FAILURE,
} from './diagnosticLaboratoryActions';


const initialState = {
  laboratoryList: [],
  workOccupancyByLaboratoryId: {},
  pendingExaminationsByLaboratoryId: {},
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
    case GET_WORK_OCCUPANCY_SUCCESS:
      const workOccupancyByLaboratoryId = action.payload;

      return {
        ...state,
        workOccupancyByLaboratoryId,
      }
    case GET_PENDING_EXAMINATIONS_SUCCESS:
      const { pendingExaminations, laboratoryId } = action.payload;
  
      return {
        ...state,
        pendingExaminationsByLaboratoryId: {
          ...state.pendingExaminationsByLaboratoryId,
          [laboratoryId]: pendingExaminations
        }
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