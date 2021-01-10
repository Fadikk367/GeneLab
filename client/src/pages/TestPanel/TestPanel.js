import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AddTestForm, TestList } from './components';

import { getAllTests } from 'state/test/testActions';
import { getAllBiologicalMaterials } from 'state/biologicalMaterial/biologicalMaterialActions';
import { getAllDiagnosticLaboratories } from 'state/diagnosticLaboratory/diagnosticLaboratoryActions';


const TestPanel = () => {
  const tests = useSelector(state => state.test.testList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTests());
    dispatch(getAllBiologicalMaterials());
    dispatch(getAllDiagnosticLaboratories());
  }, [dispatch]);

  return (
    <div>
      TestPanel<br />
      <AddTestForm />
      <TestList tests={tests}/>
    </div>
  )
}

export default TestPanel;
