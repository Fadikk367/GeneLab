import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddTestCategoryForm, TestCategoryList } from './components';

import { getAllTestCategories } from 'state/testCategory/testCategoryActions';


const TestCategoriesPanel = () => {
  const categories = useSelector(state => state.testCategory.categoryList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTestCategories());
  }, [dispatch]);


  return (
    <>
      <AddTestCategoryForm />
      <TestCategoryList categories={categories}/>
    </>
  )
}


export default TestCategoriesPanel;
