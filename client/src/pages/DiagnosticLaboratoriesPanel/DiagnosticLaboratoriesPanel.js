import React from 'react';
import { useSelector } from 'react-redux';

import { AddDiagnosticLaboratoryForm, DiagnosticLaboratoryList } from './components';

const DiagnosticLaboratoriesPanel = () => {
  const laboratories = useSelector(state => state.diagnosticLaboratory.laboratoryList);

  return (
    <div>
      DiagnosticLaboratoriesPanel<br />
      <AddDiagnosticLaboratoryForm />
      <DiagnosticLaboratoryList laboratories={laboratories}/>
    </div>
  )
}

export default DiagnosticLaboratoriesPanel
