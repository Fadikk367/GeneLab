import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AddEmployeeForm } from './components';

import { getAllEmployees } from 'state/employee/employeeActions';


const EmployeePanel = () => {
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employee.employeeList);

  useEffect(() => {
    dispatch(getAllEmployees())
  }, [dispatch]);

  return (
    <div>
      emp panel
      <AddEmployeeForm />
    </div>
  )
}

export default EmployeePanel;
