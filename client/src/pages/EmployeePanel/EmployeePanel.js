import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AddEmployeeForm, EmployeeList } from './components';

import { getAllEmployees } from 'state/employee/employeeActions';
import { getAllEmployeePositions } from 'state/employeePosition/employeePositionActions';


const EmployeePanel = () => {
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employee.employeeList);

  useEffect(() => {
    dispatch(getAllEmployees());
    dispatch(getAllEmployeePositions());
  }, [dispatch]);

  return (
    <div>
      emp panel
      <AddEmployeeForm />
      <EmployeeList employees={employees}/>
    </div>
  )
}

export default EmployeePanel;
