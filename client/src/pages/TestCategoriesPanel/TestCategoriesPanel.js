import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddTestCategoryForm, TestCategoryList } from './components';

import { getAllExaminationCategories } from 'state/examination/examinationActions';


const TestCategoriesPanel = () => {
  const categories = useSelector(state => state.examinations.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllExaminationCategories());
  }, [dispatch]);


  return (
    <>
      <AddTestCategoryForm />
      <TestCategoryList categories={categories}/>
    </>
  )
}


export default TestCategoriesPanel;
