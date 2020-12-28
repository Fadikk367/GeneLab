import React from 'react';
import { useSelector } from 'react-redux';

import { AddTestForm, TestList } from './components';

const TestPanel = () => {
  const tests = useSelector(state => state.test.testList);

  return (
    <div>
      TestPanel<br />
      <AddTestForm />
      <TestList tests={tests}/>
    </div>
  )
}

export default TestPanel
