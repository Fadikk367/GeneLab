import React from 'react';
import { useSelector } from 'react-redux';

import { TestCategoryTitle, TestListFilterForm, TestList } from './components';

const TestCatalog = () => {
  const [selectedCategory, setSelectedCategory] = React.useState({ name: '', id: null });
  const tests = useSelector(state => state.test.testList).filter(test => test.categoryid === selectedCategory.id);

  React.useEffect(() => {
    console.log('rerender');
  }, [])

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
