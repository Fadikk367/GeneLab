import {
  GET_DIAGNOSTIC_LABORATORIES_SUCCESS,
  CREATE_DIAGNOSTIC_LABORATORY_SUCCESS,
  DELETE_DIAGNOSTIC_LABORATORY_SUCCESS,

  CREATE_EXAMINATION_RESULT_SUCCESS,
  GET_PENDING_EXAMINATIONS_SUCCESS,
  GET_WORK_OCCUPANCY_SUCCESS,
} from './diagnosticLaboratoryActions';


const initialState = {
  laboratoryList: [],
  workOccupancyByLaboratoryId: {},
  pendingExaminationsByLaboratoryId: {},
  pendingExaminations: [],
}

const diagnosticLaboratoryReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_DIAGNOSTIC_LABORATORIES_SUCCESS:
      return {
        ...state,
        laboratoryList: action.payload,
      }
    case GET_WORK_OCCUPANCY_SUCCESS:
      const workOccupancyByLaboratoryId = action.payload;

      return {
        ...state,
        workOccupancyByLaboratoryId,
      }
    case GET_PENDING_EXAMINATIONS_SUCCESS:
      const pendingExaminations = action.payload;
  
      return {
        ...state,
        pendingExaminations,
      }
    case CREATE_DIAGNOSTIC_LABORATORY_SUCCESS:
      const createdDiagnosticLaboratory = action.payload;
      return {
        ...state,
        laboratoryList: [...state.laboratoryList, createdDiagnosticLaboratory]
      }
    case DELETE_DIAGNOSTIC_LABORATORY_SUCCESS:
      const deletedDiagnosticLaboratoryId = action.payload;
      return {
        ...state,
        laboratoryList: state.laboratoryList.filter(material => material.id !== deletedDiagnosticLaboratoryId)
      }
    case CREATE_EXAMINATION_RESULT_SUCCESS:
      const doneExaminationId = action.payload;

      return {
        ...state,
        pendingExaminations: state.pendingExaminations.filter(examination => examination.id !== doneExaminationId)
      }
    default:
      return state;
  }
}

export default diagnosticLaboratoryReducer;