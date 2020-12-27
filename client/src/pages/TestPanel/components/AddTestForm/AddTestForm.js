import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import { FormHeader, Form, Input, InputLabel, Select, ErrorMessage, SubmitButton } from './AddTestForm.css';
import { RelationSelect } from '..';


const AddTestForm = () => {
  const materials = useSelector(state => state.biologicalMaterial.materialList);
  const laboratories = useSelector(state => state.diagnosticLaboratory.laboratoryList);
  const categories = useSelector(state => state.testCategory.categoryList);

  const { register, handleSubmit, errors } = useForm();

  const handleSubmitForm = handleSubmit(async formData => {
    console.log(formData);
    // try {
    //   const response = await axios.post('/tests', formData);
    //   console.log(response);

    // } catch(err) {
    //   console.log(err);
    // }
  })

  return (
    <Form onSubmit={handleSubmitForm}>
      <FormHeader>Dodaj nowe badanie:</FormHeader>
      <InputLabel>
        Nazwa badania:
        <Input name='name' ref={register}/>
      </InputLabel>
      <InputLabel>
        Dolna granica:
        <Input type='number' name='minValue' ref={register}/>
      </InputLabel>
      <InputLabel>
        Górna granica:
        <Input type='number' name='maxValue' ref={register}/>
      </InputLabel>
      <InputLabel>
        Jednostka:
        <Input name='unit' ref={register}/>
      </InputLabel>
      <InputLabel>
        Cena:
        <Input name='price' ref={register}/>
      </InputLabel>
      <InputLabel>
        Kategoria:
        <RelationSelect name='categoryId' register={register} options={categories}/>
      </InputLabel>
      <InputLabel>
        Materiał:
        <RelationSelect name='materialId' register={register} options={materials}/>
      </InputLabel>
      <InputLabel>
        Pracownia:
        <RelationSelect name='laboratoryId' register={register} options={laboratories}/>
      </InputLabel>
      <SubmitButton>Dodaj</SubmitButton>
    </Form>
  )
}

export default AddTestForm
