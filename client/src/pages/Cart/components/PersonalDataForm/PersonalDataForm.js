import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { addPersonalData } from 'state/clientBasket/clientBasketActions';


const PersonalDataForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const handleSubmitForm = handleSubmit(formData => {
    console.log(formData);

    dispatch(addPersonalData(formData));
  });

  return (
    <form onSubmit={handleSubmitForm}>
      <label>
        Imię:<br />
        <input type="text" name='firstName' required ref={register}/>
      </label><br />
      <label>
        Nazwisko:<br />
        <input type="text" name='lastName' required ref={register}/>
      </label><br />
      <label>
        Data urodzenia:<br />
        <input type="date" name='dateOfBirth' required ref={register}/>
      </label><br />
      <label>
        PESEL:<br />
        <input type="text" name='pesel' required maxLength="11" minLength="11" ref={register}/>
      </label><br />
      <button type='submit'>Potwierdź</button>
    </form>
  )
}

export default PersonalDataForm;
