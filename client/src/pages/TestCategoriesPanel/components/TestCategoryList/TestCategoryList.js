import React from 'react';

import { List } from 'common/components';
import { TestCategoryItem } from '..';


const TestCategoryList = ({ categories = [] }) => {
  const renderedItems = categories.map((category, idx) => (
    <TestCategoryItem key={category.id} lp={idx} {...category}/>
  ));

  return (
    <List.Container width="100%">
      <List.Title>Test Categories ({categories.length})</List.Title>
      <List>
        {renderedItems}
      </List>
    </List.Container>
  )
}

export default TestCategoryList;