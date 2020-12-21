import { combineReducers } from 'redux';

import testFamiliesReducer from './testFamilies.reducer';


const rootReducer = combineReducers({
  testFamilies: testFamiliesReducer
});

export default rootReducer;