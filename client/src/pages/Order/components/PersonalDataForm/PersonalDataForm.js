import React, { useEffect } from 'react';
import { useFormContext  } from 'react-hook-form';

import TextField from '@material-ui/core/TextField';
import { ListTitle } from './PersonalDataForm.css';

const PersonalDataForm = ({ formContent }) => {
  const { register, errors, reset } = useFormContext();

  useEffect(() => {
    reset({ ...formContent.personalData }, { errors: true });
  }, []);

  return (
    <form>
      <ListTitle variant='h6'>Uzupełnij dane osobowe</ListTitle>
      <TextField 
        inputRef={register({ required: 'Imię jest wymagane' })}
        name='firstName'
        label='Imię'
        helperText={(errors.firstName && errors.firstName.message) || ' '}
        fullWidth
      />
      <TextField 
        inputRef={register({ required: 'Nazwisko jest wymagane' })}
        name='lastName'
        label='Nazwisko'
        helperText={(errors.lastName && errors.lastName.message) || ' '}
        fullWidth
      />
      <TextField 
        inputRef={register({ 
          required: 'Pesel jest wymagany',
          minLength: {
            value: 11,
            message: 'Pesel musi miec dokładnie 11 cyfr',
          },
          maxLength: {
            value: 11,
            message: 'Pesel musi miec dokładnie 11 cyfr',
          },
          pattern: {
            message: 'Niepoprawny format numeru PESEL',
            value: /^\d{11}$/g,
          }
        })}
        name='pesel'
        label='PESEL'
        helperText={(errors.pesel && errors.pesel.message) || ' '}
        fullWidth
      />
      <TextField 
        inputRef={register({ required: 'Data urodzenia jest wymagana' })}
        name='birthDate'
        label='Data urodzenia'
        type='date'
        helperText={(errors.birthDate && errors.birthDate.message) || ' '}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  )
}

export default PersonalDataForm;
