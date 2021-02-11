import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AddDiagnosticLaboratoryForm, DiagnosticLaboratoryList } from './components';

import { getAllDiagnosticLaboratories } from 'state/diagnosticLaboratory/diagnosticLaboratoryActions';


const DiagnosticLaboratoriesPanel = () => {
  const laboratories = useSelector(state => state.diagnosticLaboratory.laboratoryList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDiagnosticLaboratories());
  }, [dispatch])

  return (
    <>
      <AddDiagnosticLaboratoryForm />
      <DiagnosticLaboratoryList laboratories={laboratories}/>
    </>
  )
}

export default DiagnosticLaboratoriesPanel;
