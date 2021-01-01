import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AddEmployeePositionForm, EmployeePositionList } from './components';

import { getAllEmployeePositions } from 'state/employeePosition/employeePositionActions';


const EmployeePositionPanel = () => {
  const positions = useSelector(state => state.employeePosition.positionList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEmployeePositions());
  }, [dispatch]);

  return (
    <div>
      <AddEmployeePositionForm />
      <EmployeePositionList positions={positions}/>
    </div>
  )
}

export default EmployeePositionPanel;
