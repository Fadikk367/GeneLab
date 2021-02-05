import {
  GET_EXAMINATIONS_SUCCESS,
  GET_EXAMINATIONS_FAILURE,

  CREATE_EXAMINATION_SUCCESS,
  CREATE_EXAMINATION_FAILURE,

  DELETE_EXAMINATION_SUCCESS,
  DELETE_EXAMINATION_FAILURE,
} from './examinationActions';


const initialState = {
  list: []
}

const examinationReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_EXAMINATIONS_SUCCESS:
      return {
        ...state,
        list: action.payload
      }
    case GET_EXAMINATIONS_FAILURE:
      return {
        ...state,
        list: []
      }
    case CREATE_EXAMINATION_SUCCESS:
      const createdExamination = action.payload;
      return {
        ...state,
        list: [...state.list, createdExamination]
      }
    case CREATE_EXAMINATION_FAILURE:
      return {
        ...state,
      }
    case DELETE_EXAMINATION_SUCCESS:
      const deletedExamination = action.payload
      return {
        ...state,
        list: state.list.filter(examination => examination.id !== deletedExamination.id)
      }
    case DELETE_EXAMINATION_FAILURE:
      return {
        ...state,
      }
    default:
      return state;
  }
}

export default examinationReducer;