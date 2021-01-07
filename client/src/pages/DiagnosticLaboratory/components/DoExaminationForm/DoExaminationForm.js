import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const DoExaminationForm = () => {
  const [result, setResult] = useState('');
  const { laboratoryId, examinationId } = useParams();
  const dispatch = useDispatch();

  const pendingExamination = useSelector(state => (
    state.diagnosticLaboratory.pendingExaminationsByLaboratoryId)
  )[laboratoryId].find(item => item.id === parseInt(examinationId));

  const handleConfirmExaminationResult = e => {
    e.preventDefault();

    if (!result) 
      return;

    dispatch()
  }

  return (
    <form>
      <h3>Badanie: {pendingExamination && pendingExamination.name}</h3>
      <label>
        Wynik badania nr {examinationId}<br />
        <input type="text"value={result} onChange={e => setResult(e.target.value)}/>
        <span> {pendingExamination && pendingExamination.unit} </span>
        <button type='submit'>Zatwierdź</button>
      </label>
    </form>
  )
}

export default DoExaminationForm
