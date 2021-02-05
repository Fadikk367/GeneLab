import {
  GET_BIOLOGICAL_MATERIALS_SUCCESS,
  GET_BIOLOGICAL_MATERIALS_FAILURE,
  GET_EXAMINATION_TYPES_SUCCESS,
  GET_EXAMINATION_TYPES_FAILURE,
} from './commonActions';


const initialState = {
  materials: [],
  examinationTypes: [],
}

const commonReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_BIOLOGICAL_MATERIALS_SUCCESS:
      return {
        ...state,
        materials: action.payload,
      }
    case GET_BIOLOGICAL_MATERIALS_FAILURE:
      return {
        ...state,
      }
    case GET_EXAMINATION_TYPES_SUCCESS:
      return {
        ...state,
        examinationTypes: action.payload,
      }
    case GET_EXAMINATION_TYPES_FAILURE:
      return {
        ...state,
      }
    default:
      return state;
  }
}

export default commonReducer;