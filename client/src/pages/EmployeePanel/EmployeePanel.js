import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { Modal } from 'common/components'
import { AddEmployeeForm, EmployeeList, UpdateEmployeeForm } from './components';

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
    <>
      <AddEmployeeForm />
      <EmployeeList employees={employees}/>
      <Switch>
        <Route path='/admin-panel/employees/:employeeId/update'>
          <Modal title={'Aktualizacja pracownika'}>
            <UpdateEmployeeForm />
          </Modal>
        </Route>
      </Switch>
    </>
  )
}

export default EmployeePanel;
