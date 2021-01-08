import { combineReducers } from 'redux';

import testCategoryReducer from './testCategory/testCategoryReducer';
import biologicalMaterialReducer from './biologicalMaterial/biologicalMaterialReducer';
import diagnosticLaboratoryReducer from './diagnosticLaboratory/diagnosticLaboratoryReducer';
import testReducer from './test/testReducer';
import clientBasketReducer from './clientBasket/clientBasketReducer';
import employeePositionReducer from './employeePosition/employeePositionReducer';
import employeeReducer from './employee/employeeReducer';
import authReducer from './auth/authReducer';


const rootReducer = combineReducers({
  testCategory: testCategoryReducer,
  biologicalMaterial: biologicalMaterialReducer,
  diagnosticLaboratory: diagnosticLaboratoryReducer,
  test: testReducer,
  basket: clientBasketReducer,
  employeePosition: employeePositionReducer,
  employee: employeeReducer,
  auth: authReducer,
});

export default rootReducer;