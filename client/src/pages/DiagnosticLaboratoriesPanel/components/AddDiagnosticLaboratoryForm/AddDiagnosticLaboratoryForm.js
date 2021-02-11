import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { createDiagnosticLaboratory } from 'state/diagnosticLaboratory/diagnosticLaboratoryActions';


const AddDiagnosticLaboratoryForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const handleSubmitForm = handleSubmit(formData => {
    dispatch(createDiagnosticLaboratory(formData));
  })

  return (
    <form onSubmit={handleSubmitForm}>
      <label>
        Miasto:<br />
        <input type="text" name="city" ref={register({ required: true })}/>
      </label><br />
      <label>
        Ulica:<br />
        <input type="text" name="street" ref={register({ required: true })}/>
      </label><br />
      <label>
        Numer budynku:<br />
        <input type="text" name="number" ref={register({ required: true })}/>
      </label><br />
      <label>
        Liczba aparatów:<br />
        <input type="text" name="numberOfDevices" ref={register({ required: true })}/>
      </label><br />
      <button type='submit'>Dodaj</button>
    </form>
  )
}

export default AddDiagnosticLaboratoryForm;