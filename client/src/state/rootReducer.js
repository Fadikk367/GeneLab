import { combineReducers } from 'redux';

import testCategoryReducer from './testCategory/testCategoryReducer';
import biologicalMaterialReducer from './biologicalMaterial/biologicalMaterialReducer';
import diagnosticLaboratoryReducer from './diagnosticLaboratory/diagnosticLaboratoryReducer';
import testReducer from './test/testReducer';
import clientBasketReducer from './clientBasket/clientBasketReducer';
import employeePositionReducer from './employeePosition/employeePositionReducer';


const rootReducer = combineReducers({
  testCategory: testCategoryReducer,
  biologicalMaterial: biologicalMaterialReducer,
  diagnosticLaboratory: diagnosticLaboratoryReducer,
  test: testReducer,
  basket: clientBasketReducer,
  employeePosition: employeePositionReducer,
});

export default rootReducer;