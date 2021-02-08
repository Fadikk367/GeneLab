import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { createExaminationCategory } from 'state/examination/examinationActions';

const AddBiologicalMaterialForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const handleSubmitForm = handleSubmit(formData => {
    console.log(formData);
    dispatch(createExaminationCategory(formData));
  })

  return (
    <form onSubmit={handleSubmitForm}>
      <label>
        Nazwa kategorii:<br />
        <input type="text" name="name" ref={register({ required: true })}/>
      </label><br />
      <label>
        Opis kategorii:<br />
        <textarea cols="30" rows="10" name="description" ref={register({ required: true })}></textarea>
      </label><br />
      <button type='submit'>Dodaj</button>
    </form>
  )
}

export default AddBiologicalMaterialForm;
