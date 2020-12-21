import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllTestFamilies, deleteTestFamily } from 'state/actions/testFamilies.actions';


const Examinations = () => {
  const testFamilies = useSelector(state => state.testFamilies.familyList)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllTestFamilies());
  }, [dispatch]);

  const renderedTests = testFamilies.map(test => (
    <li key={test.id}>
      {test.id} - {test.familyname}
      <button onClick={() => dispatch(deleteTestFamily(test.id))}>x</button>
    </li>
  ));

  return (
    <div>
      Strona z dostepnymi badaniami
      <ul>
        {renderedTests}
      </ul>
    </div>
  )
}

export default Examinations;
