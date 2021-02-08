import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { RelationSelect } from 'common/components';

import { createBloodCollectionPoint } from 'state/bloodCollectionPoint/bloodCollectionPointActions';


const AddBloodCollectionPointForm = () => {
  const laboratories = useSelector(state => state.diagnosticLaboratory.laboratoryList);
  const optionLaboratories = laboratories.map(lab => ({ ...lab, name: lab.city + ", " + lab.address}))
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const handleSubmitForm = handleSubmit(formData => {
    console.log(formData);
    dispatch(createBloodCollectionPoint(formData));
  })

  return (
    <form onSubmit={handleSubmitForm}>
      <label>
        Miasto:<br />
        <input type="text" name="city" ref={register({ required: true })}/>
      </label><br />
      <label>
        Adres:<br />
        <input type="text" name="address" ref={register({ required: true })}/>
      </label><br />
      <label>
        Odpowiedzialne laboratorium:<br />
        <RelationSelect name="laboratoryId" register={register({ required: true })} options={optionLaboratories}/>
      </label>
      <button type='submit'>Dodaj</button>
    </form>
  )
}

export default AddBloodCollectionPointForm;
