import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { FormHeader, Form, Input, InputLabel, SubmitButton } from './AddEmployeeForm.css';
import { RelationSelect } from '..';

import { createEmployee } from 'state/employee/employeeActions';


const AddEmployeeForm = () => {
  const positions = useSelector(state => state.employeePosition.positionList);
  const laboratories = useSelector(state => state.diagnosticLaboratory.laboratoryList);
  const optionLaboratories = laboratories.map(lab => ({ ...lab, name: lab.city + ", " + lab.street + " " + lab.number}))

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
      laboratoryId,
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
        laboratoryId,
        email,
        password,
      },
    }));
  })

  return (
    <Form onSubmit={handleSubmitForm}>
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
      <InputLabel>
        Laboratorium:
        <RelationSelect name='laboratoryId' register={register} options={optionLaboratories}/>
      </InputLabel>
      <SubmitButton>Dodaj</SubmitButton>
    </Form>
  )
}

export default AddEmployeeForm;