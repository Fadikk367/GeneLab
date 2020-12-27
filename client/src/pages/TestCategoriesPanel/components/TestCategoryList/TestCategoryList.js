import React from 'react';

import { List } from 'common/components';
import { TestCategoryItem } from '..';


const TestCategoryList = ({ categories = [] }) => {
  const renderedItems = categories.map((material, idx) => (
    <TestCategoryItem key={material.id} lp={idx} {...material}/>
  ));

  return (
    <List.Container>
      <List.Title>Test Categories ({categories.length})</List.Title>
      <List>
        {renderedItems}
      </List>
    </List.Container>
  )
}

export default TestCategoryList;