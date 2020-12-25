import { combineReducers } from 'redux';

import testCategoryReducer from './testCategory/testCategoryReducer';


const rootReducer = combineReducers({
  testCategory: testCategoryReducer
});

export default rootReducer;