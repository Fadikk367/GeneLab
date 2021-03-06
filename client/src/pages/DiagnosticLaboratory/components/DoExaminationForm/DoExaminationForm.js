import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { Form, SubmitButton, Label, ResultInput } from './DoExaminationForm.css';

import { createExaminationResult } from 'state/diagnosticLaboratory/diagnosticLaboratoryActions';


const DoExaminationForm = () => {
  const [result, setResult] = useState('');
  const { examinationId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const pendingExamination = useSelector(state => (
    state.diagnosticLaboratory.pendingExaminations)
  ).find(item => item.id === parseInt(examinationId));

  const handleConfirmExaminationResult = async e => {
    e.preventDefault();

    if (!result) 
      return;

    dispatch(createExaminationResult(examinationId, result));
    history.goBack();
  }

  return (
    <Form onSubmit={handleConfirmExaminationResult}>
      <p>Badanie: {pendingExamination && pendingExamination.name}</p>
      <p>Numer zlecenia badania: {examinationId}</p>
      <Label>
        Wynik:
        <ResultInput type="text"value={result} onChange={e => setResult(e.target.value)}/>
        <span> {pendingExamination && pendingExamination.unit} </span>
      </Label>
      <SubmitButton type='submit'>Zatwierdź</SubmitButton>
    </Form>
  )
}

export default DoExaminationForm
