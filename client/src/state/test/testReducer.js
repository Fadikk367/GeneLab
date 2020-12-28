import {
  GET_TESTS_SUCCESS,
  GET_TESTS_FAILURE,

  CREATE_TEST_SUCCESS,
  CREATE_TEST_FAILURE,

  DELETE_TEST_SUCCESS,
  DELETE_TEST_FAILURE,
} from './testActions';


const initialState = {
  testList: []
}

const testReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_TESTS_SUCCESS:
      return {
        ...state,
        testList: action.payload.tests
      }
    case GET_TESTS_FAILURE:
      return {
        ...state,
        testList: []
      }
    case CREATE_TEST_SUCCESS:
      const createdTest = action.payload.createdTest
      return {
        ...state,
        testList: [...state.testList, createdTest]
      }
    case CREATE_TEST_FAILURE:
      return {
        ...state,
      }
    case DELETE_TEST_SUCCESS:
      const deletedTest = action.payload.deletedTest
      return {
        ...state,
        testList: state.testList.filter(test => test.id !== deletedTest.id)
      }
    case DELETE_TEST_FAILURE:
      return {
        ...state,
      }
    default:
      return state;
  }
}

export default testReducer;