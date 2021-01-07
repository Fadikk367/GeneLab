import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { getPendingExaminations } from 'state/diagnosticLaboratory/diagnosticLaboratoryActions';

const useQueryParams = () => (new URLSearchParams(useLocation().search));


const DiagnosticLaboratory = () => {
  const { laboratoryName } = useParams();
  const dispatch = useDispatch();
  const queryParams = useQueryParams();
  const laboratoryId = queryParams.get('id');

  useEffect(() => {
    dispatch(getPendingExaminations(laboratoryId));
  }, [laboratoryId, dispatch]);

  const pendingExaminations = useSelector(state => (
    state.diagnosticLaboratory.pendingExaminationsByLaboratoryId[laboratoryId]
  )) || [];

  const pendingExaminationsItems = pendingExaminations.map((item, i) => (
    <li key={item.id}>
      {i}. {item.name} \ {item.min}-{item.max} {item.unit} \ {item.id} \ {item.material}
      <button>Wykonaj</button>
    </li>
  ));
  
  return (
    <div>
      <h1>{laboratoryName}</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus iusto voluptatem eveniet exercitationem aperiam voluptatum molestiae qui laboriosam aliquid! Quia fuga voluptatem libero nemo, iure sed nam omnis dolor, iusto numquam nisi. Atque fugiat sit.</p>
      <ul>
        {pendingExaminationsItems}
      </ul>
    </div>
  )
}

export default DiagnosticLaboratory
