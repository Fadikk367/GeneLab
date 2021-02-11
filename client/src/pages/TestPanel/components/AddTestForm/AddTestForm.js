import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { FormHeader, Form, Input, InputLabel, SubmitButton, Select } from './AddTestForm.css';

import { createTest } from 'state/examination/examinationActions'


const AddTestForm = () => {
  const materials = useSelector(state => state.common.materials);
  const examinationTypes = useSelector(state => state.common.examinationTypes);
  const categories = useSelector(state => state.examinations.categories);

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
        <Input name='name' ref={register} required/>
      </InputLabel>
      <InputLabel>
        Dolna granica:
        <Input type='number' name='minValue' ref={register} required/>
      </InputLabel>
      <InputLabel>
        Górna granica:
        <Input type='number' name='maxValue' ref={register} required/>
      </InputLabel>
      <InputLabel>
        Jednostka:
        <Input name='unit' ref={register} required/>
      </InputLabel>
      <InputLabel>
        Cena:
        <Input name='price' ref={register} required/>
      </InputLabel>
      <InputLabel>
        Materiał:
        <Select name='material' ref={register}>
          {materials.map(material => (
            <option key={material} value={material}>{material}</option>
          ))}
        </Select>
      </InputLabel>
      <InputLabel>
        Rodzaj:
        <Select name='type' ref={register}>
          {examinationTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </Select>
      </InputLabel>
      <InputLabel>
        Kategorie:
        <Select name='categoryIds' ref={register} multiple size="5">
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Select>
        {/* <RelationSelect name='type' register={register} options={examinationTypes}/> */}
      </InputLabel>
      <SubmitButton>Dodaj</SubmitButton>
    </Form>
  )
}

export default AddTestForm;
