import React from 'react';

import { TitleBox, Category, StaticSpan } from './TestCategoryTitle.css';

const TestCategoryTitle = ({ categoryName }) => {
  return (
    <>
      <TitleBox>
        <StaticSpan>Kategoria </StaticSpan>
        <Category>{categoryName}</Category>
      </TitleBox>
    </>
  )
}

export default TestCategoryTitle
