import React from 'react';
import { useSelector } from 'react-redux';
import { AddTestCategoryForm, TestCategoryList } from './components';

const TestCategoriesPanel = () => {
  const categories = useSelector(state => state.testCategory.categoryList);

  return (
    <>
      <AddTestCategoryForm />
      <TestCategoryList categories={categories}/>
    </>
  )
}


export default TestCategoriesPanel;
