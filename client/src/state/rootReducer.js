import { combineReducers } from 'redux';

import testCategoryReducer from './testCategory/testCategoryReducer';
import biologicalMaterialReducer from './biologicalMaterial/biologicalMaterialReducer';
import diagnosticLaboratoryReducer from './diagnosticLaboratory/diagnosticLaboratoryReducer';


const rootReducer = combineReducers({
  testCategory: testCategoryReducer,
  biologicalMaterial: biologicalMaterialReducer,
  diagnosticLaboratory: diagnosticLaboratoryReducer,
});

export default rootReducer;