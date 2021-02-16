import React, { useEffect } from 'react';
import { useFormContext  } from 'react-hook-form';


const PersonalDataForm = ({ formContent }) => {
  const { register, errors, reset, trigger } = useFormContext();

  useEffect(() => {
    reset({ ...formContent.personalData }, { errors: true });
  }, []);

  return (
    <form>
      <h3>Uzupełnij dane osobowe</h3>
      <label>
        Imię:<br />
        <input type="text" name='firstName' ref={register({ required: 'Imię jest wymagane' })}/>
        <p>{errors.firstName && errors.firstName.message}</p>
      </label><br />
      <label>
        Nazwisko:<br />
        <input type="text" name='lastName' ref={register({ required: 'Nazwisko jest wymagane' })}/>
        <p>{errors.lastName && errors.lastName.message}</p>
      </label><br />
      <label>
        Numer PESEL:<br />
        <input type="text" name='pesel' ref={register({ required: 'Pesel jest wymagany', minLength: { value: 11, message: 'Pesel musi mieć dokładnie 11 znaków' } })}/>
        <p>{errors.pesel && errors.pesel.message}</p>
      </label><br />
      <label>
        Data urodzenia:<br />
        <input type="date" name='birthDate' ref={register({ required: 'Data urodzenia jest wymagana' })}/>
        <p>{errors.birthDate && errors.birthDate.message}</p>
      </label><br />
    </form>
  )
}

export default PersonalDataForm;
