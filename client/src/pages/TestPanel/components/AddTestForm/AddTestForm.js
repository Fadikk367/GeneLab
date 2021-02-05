import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import { FormHeader, Form, Input, InputLabel, SubmitButton } from './AddTestForm.css';
import { RelationSelect } from '..';

import { createTest } from 'state/examination/examinationActions'


const AddTestForm = () => {
  const materials = useSelector(state => state.common.materials);
  const examinationTypes = useSelector(state => state.common.examinationTypes);
  const categories = useSelector(state => state.testCategory.categoryList);

  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();

  const handleSubmitForm = handleSubmit(async formData => {
    console.log(formData);
    dispatch(createTest(formData));
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
        Materiał:
        <select name='material' ref={register}>
          {materials.map(material => (
            <option key={material} value={material}>{material}</option>
          ))}
        </select>
        {/* <RelationSelect name='material' register={register} options={materials}/> */}
      </InputLabel>
      <InputLabel>
        Rodzaj:
        <select name='type' ref={register}>
          {examinationTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {/* <RelationSelect name='type' register={register} options={examinationTypes}/> */}
      </InputLabel>
      <SubmitButton>Dodaj</SubmitButton>
    </Form>
  )
}

export default AddTestForm;
