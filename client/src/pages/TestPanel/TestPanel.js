import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AddTestForm, TestList } from './components';

import { getAllTests, getAllExaminationCategories } from 'state/examination/examinationActions';
import { getBiologicalMaterials, getAllExaminationTypes } from 'state/common/commonActions';


const TestPanel = () => {
  const tests = useSelector(state => state.examinations.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTests());
    dispatch(getBiologicalMaterials());
    dispatch(getAllExaminationTypes());
    dispatch(getAllExaminationCategories());
  }, [dispatch]);

  return (
    <>
      <AddTestForm />
      <TestList tests={tests}/>
    </>
  )
}

export default TestPanel;
