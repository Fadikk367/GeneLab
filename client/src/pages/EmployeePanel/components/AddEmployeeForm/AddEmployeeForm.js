import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { FormHeader, Form, Input, InputLabel, SubmitButton } from './AddEmployeeForm.css';
import { RelationSelect } from '..';

import { createEmployee } from 'state/employee/employeeActions';


const AddEmployeeForm = () => {
  const positions = useSelector(state => state.employeePosition.positionList);

  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();

  const handleSubmitForm = handleSubmit(async formData => {
    const {
      firstName,
      lastName,
      pesel,
      positionId,
      email,
      password,
      dateOfBirth,
    } = formData;

    dispatch(createEmployee({
      personalData: {
        firstName,
        lastName,
        pesel,
        dateOfBirth,
      },
      employeeData: {
        positionId,
        email,
        password,
      },
    }));
  })

  return (
    <Form onSubmit={handleSubmitForm}>
      <FormHeader>Dodaj nowe badanie:</FormHeader>
      <InputLabel>
        Imię:
        <Input name='firstName' ref={register}/>
      </InputLabel>
      <InputLabel>
        Nazwisko:
        <Input name='lastName' ref={register}/>
      </InputLabel>
      <InputLabel>
        Pesel:
        <Input name='pesel' ref={register}/>
      </InputLabel>
      <InputLabel>
        Email:
        <Input name='email' ref={register}/>
      </InputLabel>
      <InputLabel>
        Hasło:
        <Input name='password' ref={register}/>
      </InputLabel>
      <InputLabel>
        Data urodzenia:
        <Input type="date" name='dateOfBirth' ref={register}/>
      </InputLabel>
      <InputLabel>
        Stanowisko:
        <RelationSelect name='positionId' register={register} options={positions}/>
      </InputLabel>
      <SubmitButton>Dodaj</SubmitButton>
    </Form>
  )
}

export default AddEmployeeForm;