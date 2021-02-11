import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'api/axiosInstance';

import { TestCategoryTitle, TestListFilterForm, TestList } from './components';


const TestCatalog = () => {
  const categories = useSelector(state => state.examinations.categories);
  const [selectedCategory, setSelectedCategory] = React.useState(categories[0] || { name: 'Wybierz kategorię', id: -1});
  const [examinations, setExaminations] = React.useState([]);


  useEffect(() => {
    async function fetchExaminations(categoryId) {
      try {
        const response = await axios.get(`/examinations/category/${categoryId}`);
        setExaminations(response.data);
      } catch(err) {
        console.log(err);
      }
    }

    if (selectedCategory.id !== -1) {
      fetchExaminations(selectedCategory.id);
    }
  }, [selectedCategory])

  return (
    <div style={{width: '90%', margin: '0 auto'}}>
      <TestCategoryTitle categoryName={selectedCategory.name}/>
      <div style={{ display: 'flex', gap: '20px' }}>
        <TestList items={examinations}/>
        <TestListFilterForm handleSelectCategory={setSelectedCategory} categories={categories}/>
      </div>
    </div>
  )
}

export default TestCatalog
