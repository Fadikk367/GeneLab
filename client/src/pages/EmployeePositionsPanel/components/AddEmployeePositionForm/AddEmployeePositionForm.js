import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { createEmployeePosition } from 'state/employeePosition/employeePositionActions';

const AddEmployeePositionForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const handleSubmitForm = handleSubmit(formData => {
    console.log(formData);
    dispatch(createEmployeePosition(formData.name, formData.salary, formData.description));
  })

  return (
    <form onSubmit={handleSubmitForm}>
      <label>
        Nazwa stanowiska:<br />
        <input type="text" name="name" ref={register({ required: true })}/>
      </label><br />
      <label>
        Pensja:<br />
        <input type="text" name="salary" ref={register({ required: true })}/>
      </label><br />
      <label>
        Opis stanowiska:<br />
        <textarea cols="30" rows="10" name="description" ref={register({ required: true })}></textarea>
      </label><br />
      <button type='submit'>Dodaj</button>
    </form>
  )
}

export default AddEmployeePositionForm;
