import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllTestCategories, deleteTestCategory } from 'state/testCategory/testCategoryActions';


const Examinations = () => {
  const testCategories = useSelector(state => state.testCategory.categoryList)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllTestCategories());
  }, [dispatch]);

  const renderedTestCategories = testCategories.map(category => (
    <li key={category.id}>
      {category.id} - {category.name}
      <button onClick={() => dispatch(deleteTestCategory(category.id))}>x</button>
    </li>
  ));

  return (
    <div>
      Strona z dostepnymi badaniami
      <ul>
        {renderedTestCategories}
      </ul>
    </div>
  )
}

export default Examinations;
