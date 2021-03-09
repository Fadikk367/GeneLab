import React from 'react'
import { useSelector } from 'react-redux';

import { CategoryListHeader, CategoryList, CategoryItem } from './TestListFilterForm.css';


const TestListFilterForm = ({ handleSelectCategory, categories }) => {
  const renderedCategories = categories.map(category => (
    <CategoryItem 
      key={category.id}
      onClick={() => handleSelectCategory({ name: category.name, id: category.id })}
    >
      {category.name}
    </CategoryItem>
  ));

  return (
    <div style={{width: '240px'}}>
      <CategoryListHeader>Kategorie badań</CategoryListHeader>
      <CategoryList>
        {renderedCategories}
      </CategoryList>
    </div>
  )
}

export default TestListFilterForm
