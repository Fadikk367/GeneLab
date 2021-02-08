import { combineReducers } from 'redux';

import testCategoryReducer from './testCategory/testCategoryReducer';
import bloodCollectionPointReducer from './bloodCollectionPoint/bloodCollectionPointReducer';
import diagnosticLaboratoryReducer from './diagnosticLaboratory/diagnosticLaboratoryReducer';
import clientBasketReducer from './clientBasket/clientBasketReducer';
import employeePositionReducer from './employeePosition/employeePositionReducer';
import employeeReducer from './employee/employeeReducer';
import authReducer from './auth/authReducer';

import examinationReducer from './examination/examinationReducer';
import commonReducer from './common/commonReducer';


const rootReducer = combineReducers({
  testCategory: testCategoryReducer,
  bloodCollectionPoints: bloodCollectionPointReducer,
  diagnosticLaboratory: diagnosticLaboratoryReducer,
  examinations: examinationReducer,
  basket: clientBasketReducer,
  employeePosition: employeePositionReducer,
  employee: employeeReducer,
  auth: authReducer,
  common: commonReducer,
});

export default rootReducer;