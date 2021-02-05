import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TestCategoryTitle, TestListFilterForm, TestList } from './components';

import { getAllTests } from 'state/test/testActions';



const TestCatalog = () => {
  const [selectedCategory, setSelectedCategory] = React.useState({ name: 'Wszystkie', id: -1 });
  const tests = useSelector(state => state.test.testList).filter(test => {
    if (selectedCategory.id === -1) return true;
    return test.categoryid === selectedCategory.id;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTests());
  }, [dispatch])

  return (
    <div style={{width: '90%', margin: '0 auto'}}>
      <TestCategoryTitle categoryName={selectedCategory.name}/>
      <div style={{ display: 'flex', gap: '20px' }}>
        <TestList items={tests}/>
        <TestListFilterForm handleSelectCategory={setSelectedCategory}/>
      </div>
    </div>
  )
}

export default TestCatalog
