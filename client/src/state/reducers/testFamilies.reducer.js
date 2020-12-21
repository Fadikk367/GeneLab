import {
  GET_TEST_FAMILIES_SUCCESS,
  GET_TEST_FAMILIES_FAILURE,

  CREATE_TEST_FAMILY_SUCCESS,
  CREATE_TEST_FAMILY_FAILURE,

  DELETE_TEST_FAMILY_SUCCESS,
  DELETE_TEST_FAMILY_FAILURE,
} from '../constants';

const initialState = {
  familyList: []
}

const testFamiliesReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_TEST_FAMILIES_SUCCESS:
      return {
        ...state,
        familyList: action.payload.testFamilies
      }
    case GET_TEST_FAMILIES_FAILURE:
      return {
        ...state,
        familyList: []
      }
    case CREATE_TEST_FAMILY_SUCCESS:
      const createdTestFamily = action.payload.createdTestFamily
      return {
        ...state,
        familyList: [...state.familyList, createdTestFamily]
      }
    case CREATE_TEST_FAMILY_FAILURE:
      return {
        ...state,
      }
    case DELETE_TEST_FAMILY_SUCCESS:
      const deletedTestFamily = action.payload.deletedTestFamily
      return {
        ...state,
        familyList: state.familyList.filter(family => family.id !== deletedTestFamily.id)
      }
    case DELETE_TEST_FAMILY_FAILURE:
      return {
        ...state,
      }
    default:
      return state;
  }
}

export default testFamiliesReducer;