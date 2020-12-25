import {
  GET_TEST_CATEGORIES_SUCCESS,
  GET_TEST_CATEGORIES_FAILURE,

  CREATE_TEST_CATEGORY_SUCCESS,
  CREATE_TEST_CATEGORY_FAILURE,

  DELETE_TEST_CATEGORY_SUCCESS,
  DELETE_TEST_CATEGORY_FAILURE,
} from './testCategoryActions';


const initialState = {
  categoryList: []
}

const testCategoriesReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_TEST_CATEGORIES_SUCCESS:
      return {
        ...state,
        categoryList: action.payload.testCategories
      }
    case GET_TEST_CATEGORIES_FAILURE:
      return {
        ...state,
        categoryList: []
      }
    case CREATE_TEST_CATEGORY_SUCCESS:
      const createdTestCategory = action.payload.createdTestCategory
      return {
        ...state,
        categoryList: [...state.categoryList, createdTestCategory]
      }
    case CREATE_TEST_CATEGORY_FAILURE:
      return {
        ...state,
      }
    case DELETE_TEST_CATEGORY_SUCCESS:
      const deletedTestCategory = action.payload.deletedTestCategory
      return {
        ...state,
        categoryList: state.categoryList.filter(category => category.id !== deletedTestCategory.id)
      }
    case DELETE_TEST_CATEGORY_FAILURE:
      return {
        ...state,
      }
    default:
      return state;
  }
}

export default testCategoriesReducer;