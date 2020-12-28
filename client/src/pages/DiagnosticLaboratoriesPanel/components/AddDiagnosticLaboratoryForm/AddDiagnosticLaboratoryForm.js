import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { createDiagnosticLaboratory } from 'state/diagnosticLaboratory/diagnosticLaboratoryActions';


const AddDiagnosticLaboratoryForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const handleSubmitForm = handleSubmit(formData => {
    dispatch(createDiagnosticLaboratory(formData.name, formData.description));
  })

  return (
    <form onSubmit={handleSubmitForm}>
      <label>
        Nazwa pracowni:<br />
        <input type="text" name="name" ref={register({ required: true })}/>
      </label><br />
      <label>
        Opis pracowni:<br />
        <textarea cols="30" rows="10" name="description" ref={register({ required: true })}></textarea>
      </label><br />
      <button type='submit'>Dodaj</button>
    </form>
  )
}

export default AddDiagnosticLaboratoryForm;