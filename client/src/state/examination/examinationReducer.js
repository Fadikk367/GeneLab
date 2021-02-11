import {
  GET_EXAMINATIONS_SUCCESS,
  GET_EXAMINATIONS_FAILURE,

  CREATE_EXAMINATION_SUCCESS,
  CREATE_EXAMINATION_FAILURE,

  DELETE_EXAMINATION_SUCCESS,
  DELETE_EXAMINATION_FAILURE,

  GET_EXAMINATIONS_CATEGORIES_SUCCESS,
  CREATE_EXAMINATION_CATEGORY_SUCCESS,
  DELETE_EXAMINATION_CATEGORY_SUCCESS,
} from './examinationActions';


const initialState = {
  list: [],
  categories: [],
}

const examinationReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_EXAMINATIONS_SUCCESS:
      return {
        ...state,
        list: action.payload
      }
    case CREATE_EXAMINATION_SUCCESS:
      const createdExamination = action.payload;
      return {
        ...state,
        list: [...state.list, createdExamination]
      }
    case DELETE_EXAMINATION_SUCCESS:
      const deletedExaminationId = parseInt(action.payload);
      
      return {
        ...state,
        list: state.list.filter(examination => examination.id !== deletedExaminationId)
      }
    case GET_EXAMINATIONS_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      }
    case CREATE_EXAMINATION_CATEGORY_SUCCESS:
      const createdCategory = action.payload;
      console.log({ createdCategory })

      return {
        ...state,
        categories: [...state.categories, createdCategory],
      }
    case DELETE_EXAMINATION_CATEGORY_SUCCESS:
      const deletedCategoryId = action.payload;
      const remainingExaminationCategories = state.categories.filter(category => category.id !== deletedCategoryId);

      return {
        ...state,
        categories: remainingExaminationCategories,
      }
    default:
      return state;
  }
}

export default examinationReducer;