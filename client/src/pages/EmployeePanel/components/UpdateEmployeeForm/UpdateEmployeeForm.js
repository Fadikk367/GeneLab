import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { Form, SubmitButton, Label, ResultInput } from './UpdateEmployeeForm.css';

import { updateEmployee } from 'state/employee/employeeActions';


const UpdateEmployeeForm = () => {
  const [bonus, setBonus] = useState(0);
  const { employeeId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const employee = useSelector(state => state.employee.employeeList)
    .find(item => item.id === parseInt(employeeId));


  const handleConfirmUpdate = async e => {
    e.preventDefault();

    if (!bonus) 
      return;

    dispatch(updateEmployee(employeeId, bonus));
    history.goBack();
  }

  return (
    <Form onSubmit={handleConfirmUpdate}>
      <p>Pracownik: {employee && (employee.firstName + " " + employee.lastName)}</p>
      <p>Obecna premia: {employee && employee.bonus}</p>
      <Label>
        Nowa premia:
        <ResultInput type="number" value={bonus} onChange={e => setBonus(parseInt(e.target.value))}/>
      </Label>
      <SubmitButton type='submit'>Zatwierdź</SubmitButton>
    </Form>
  )
}

export default UpdateEmployeeForm;
