import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AddTestForm, TestList } from './components';

import { getAllTests } from 'state/examination/examinationActions';
import { getBiologicalMaterials, getAllExaminationTypes } from 'state/common/commonActions';


const TestPanel = () => {
  const tests = useSelector(state => state.examinations.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTests());
    dispatch(getBiologicalMaterials());
    dispatch(getAllExaminationTypes());
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
